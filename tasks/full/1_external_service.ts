import { task } from 'hardhat/config';
import { ConfigNames, getGenesisPoolAdmin, loadPoolConfig } from '../../helpers/configuration';
import { ZERO_ADDRESS } from '../../helpers/constants';
import { PRICE_ADDRESS } from '../../markets/aave/commons';
import {
  deployAaveCollector,
  deployChainlinkRegistry,
  deployInitializableAdminUpgradeabilityProxy,
  deployLendingPoolAddressesProviderRegistry,
  deployPriceOracle,
} from '../../helpers/contracts-deployments';
import { getParamPerNetwork, registerContractInJsonDb } from '../../helpers/contracts-helpers';
import { waitForTx, notFalsyOrZeroAddress } from '../../helpers/misc-utils';
import { eContractid, eEthereumNetwork } from '../../helpers/types';
task('full:deploy-external-service', 'Deploy external contract')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, DRE) => {
    const POOL_NAME = ConfigNames.Aave;
    const poolConfig = loadPoolConfig(POOL_NAME);
    const network = <eEthereumNetwork>DRE.network.name;

    const { AaveCollector } = eContractid;
    await DRE.run('set-DRE');
    const fallbackOracle = await deployPriceOracle(PRICE_ADDRESS, verify);

    // await waitForTx(await fallbackOracle.setEthUsdPrice('2345848466240000000'));
    const chainLinkRegistry = await deployChainlinkRegistry(verify);
    console.log(chainLinkRegistry.address);

    console.log(`\tDeploying AaveCollectorImpl`);
    const aaveCollectorImpl = await deployAaveCollector(verify);
    console.log(aaveCollectorImpl.address);

    console.log(`\tDeploying AaveCollector Transparent Proxy ...`);
    const AaveCollectorProxy = await deployInitializableAdminUpgradeabilityProxy(verify);
    await registerContractInJsonDb(AaveCollector, AaveCollectorProxy);
    await AaveCollectorProxy.deployTransaction.wait();
    const encodedInitializeStakedAave = aaveCollectorImpl.interface.encodeFunctionData(
      'initialize'
    );
    console.log('admin', network);
    const admin = getParamPerNetwork(poolConfig.ProviderRegistryOwner, network);
    console.log('admin', admin);
    console.log(encodedInitializeStakedAave);
    await waitForTx(
      await AaveCollectorProxy.functions['P'](
        aaveCollectorImpl.address,
        //@ts-ignore
        admin,
        encodedInitializeStakedAave
      )
    );
  });
