import { task } from 'hardhat/config';
import { getParamPerNetwork } from '../../helpers/contracts-helpers';
import {
  deployLendingPoolCollateralManager,
  deployWalletBalancerProvider,
  deployAaveProtocolDataProvider,
  deployWETHGateway,
  deployDefaultReserveInterestRateStrategy,
} from '../../helpers/contracts-deployments';
import {
  loadPoolConfig,
  ConfigNames,
  getWethAddress,
  getTreasuryAddress,
} from '../../helpers/configuration';
import { eEthereumNetwork, ICommonConfiguration } from '../../helpers/types';
import { waitForTx } from '../../helpers/misc-utils';
import { initReservesByHelper, configureReservesByHelper } from '../../helpers/init-helpers';
import { exit } from 'process';
import {
  getAaveProtocolDataProvider,
  getInterestRateStrategy,
  getLendingPool,
  getLendingPoolAddressesProvider,
  getLendingPoolConfiguratorProxy,
} from '../../helpers/contracts-getters';
import { ZERO_ADDRESS } from '../../helpers/constants';
import { strategyXPO } from '../../markets/aave/reservesConfigs';
import { verifyContract } from '../../helpers/etherscan-verification';

task('full:update-asset', 'Initialize lending pool configuration.')
  .addFlag('verify', 'Verify contracts at Etherscan')
  // .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, localBRE) => {
    try {
      await localBRE.run('set-DRE');
      const network = <eEthereumNetwork>localBRE.network.name;

      // const poolConfig = loadPoolConfig(ConfigNames.Aave);
      // await verifyContract("0x05056c661E5065A3D10BC6ca77fEaa0a803e4744", [])
      // await verifyContract("0x58d2b3d193dfdc42fe4e3e6065307365d0157eca", ["0x2cbd71f0f322f12dd33b1f156a7cf28f8a568929"])
      // const rateStrategyConfigArgs: string[] = [
      //   "0x9081f0387EA6474220B5d59C040fE8C46C3f9c1f",
      //     strategyXPO.optimalUtilizationRate,
      //     strategyXPO.baseVariableBorrowRate,
      //     strategyXPO.variableRateSlope1,
      //     strategyXPO.variableRateSlope2,
      //     strategyXPO.stableRateSlope1,
      //     strategyXPO.stableRateSlope2
      // ]
      // console.log("rateStrategyConfigArgs", rateStrategyConfigArgs)
      const LendingPool = await getLendingPool('0x618BD91EBe2224B7CD433D92532730da10032e08');
      // const deposit = await LendingPool.deposit(
      //   "0x9081f0387EA6474220B5d59C040fE8C46C3f9c1f",
      //   "10000000000000000000",
      //   "0x584257E9299B159eaa462A41eEAf96E8B6501AC3",
      //   0
      // )
      // console.log("deposit", deposit)

      const reserveData = await LendingPool.getReserveData(
        '0xebb59cebfb63f218db6b5094dc14abf34d56d35d'
      );
      console.log(reserveData);
      const strategy = await getInterestRateStrategy(reserveData.interestRateStrategyAddress);
      console.log(
        'OPTIMAL_UTILIZATION_RATE',
        (await strategy.OPTIMAL_UTILIZATION_RATE()).toString()
      );
      console.log('variableRateSlope1', (await strategy.variableRateSlope1()).toString());
      console.log('variableRateSlope2', (await strategy.variableRateSlope2()).toString());
      console.log('stableRateSlope1', (await strategy.stableRateSlope1()).toString());
      console.log('stableRateSlope2', (await strategy.stableRateSlope2()).toString());
      console.log('EXCESS_UTILIZATION_RATE', strategy.EXCESS_UTILIZATION_RATE());
      // const rates = await deployDefaultReserveInterestRateStrategy(
      //   [
      //     "0x2cBd71F0f322f12DD33b1F156a7Cf28f8A568929",
      //     strategyXPO.optimalUtilizationRate,
      //     strategyXPO.baseVariableBorrowRate,
      //     strategyXPO.variableRateSlope1,
      //     strategyXPO.variableRateSlope2,
      //     strategyXPO.stableRateSlope1,
      //     strategyXPO.stableRateSlope2
      //   ],
      //   verify
      // );
      // await rates.deployTransaction.wait();
      // const LendingPoolConfigurator = await getLendingPoolConfiguratorProxy("0x2ed441cb425234f8a3751a592f96bf6064927046");
      // const updateReserver = await LendingPoolConfigurator.setReserveInterestRateStrategyAddress(
      //   "0x9081f0387EA6474220B5d59C040fE8C46C3f9c1f",
      //   rates.address
      // )
      // console.log("updateReserver", updateReserver)
    } catch (err) {
      console.error(err);
      exit(1);
    }
  });
