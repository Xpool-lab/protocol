import { task } from 'hardhat/config';
import { insertContractAddressInDb } from '../../helpers/contracts-helpers';
import {
  deployATokensAndRatesHelper,
  deployLendingPool,
  deployLendingPoolConfigurator,
  deployStableAndVariableTokensHelper,
} from '../../helpers/contracts-deployments';
import { eContractid } from '../../helpers/types';
import { waitForTx } from '../../helpers/misc-utils';
import {
  getLendingPoolAddressesProvider,
  getLendingPool,
  getLendingPoolConfiguratorProxy,
} from '../../helpers/contracts-getters';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { verifyContract } from '../../helpers/etherscan-verification';

task('full:deploy-lending-pool', 'Deploy lending pool for dev enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, DRE: HardhatRuntimeEnvironment) => {
    try {
      await DRE.run('set-DRE');

      const addressesProvider = await getLendingPoolAddressesProvider();
      // Deploy lending pool
      const lendingPoolImpl = await deployLendingPool(false);
      // Set lending pool impl to address provider
      const deploylending = await waitForTx(
        await addressesProvider.setLendingPoolImpl(lendingPoolImpl.address)
      );
      console.log('Lending Pool Impl: ', lendingPoolImpl.address);

      const address = await addressesProvider.getLendingPool();
      const lendingPoolProxy = await getLendingPool(address);
      await insertContractAddressInDb(eContractid.LendingPool, lendingPoolProxy.address);

      // Deploy lending pool configurator
      const lendingPoolConfiguratorImpl = await deployLendingPoolConfigurator(verify);
      // Set lending pool conf impl to Address Provider

      const setlendingpool = await waitForTx(
        await addressesProvider.setLendingPoolConfiguratorImpl(lendingPoolConfiguratorImpl.address)
      );
      console.log('setlendingpool :', setlendingpool.transactionHash);

      const lendingPoolConfiguratorProxy = await getLendingPoolConfiguratorProxy(
        await addressesProvider.getLendingPoolConfigurator()
      );
      await insertContractAddressInDb(
        eContractid.LendingPoolConfigurator,
        lendingPoolConfiguratorProxy.address
      );
      // Deploy deployment helpers
      await deployStableAndVariableTokensHelper(
        [lendingPoolProxy.address, addressesProvider.address],
        verify
      );
      await deployATokensAndRatesHelper(
        [lendingPoolProxy.address, addressesProvider.address, lendingPoolConfiguratorProxy.address],
        verify
      );
    } catch (error) {
      if (DRE.network.name.includes('tenderly')) {
        const transactionLink = `https://dashboard.tenderly.co/${DRE.config.tenderly.username}/${
          DRE.config.tenderly.project
        }/fork/${DRE.tenderlyRPC.getFork()}/simulation/${DRE.tenderlyRPC.getHead()}`;
        console.error('Check tx error:', transactionLink);
      }
      throw error;
    }
  });
