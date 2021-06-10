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
import { oneRay, ZERO_ADDRESS } from '../../helpers/constants';
import { strategyXPO } from '../../markets/aave/reservesConfigs';
import { verifyContract } from '../../helpers/etherscan-verification';
import BigNumber from 'bignumber.js';

task('full:verify-contract', 'Initialize lending pool configuration.')
  .addFlag('verify', 'Verify contracts at Etherscan')
  // .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, localBRE) => {
    try {
      await localBRE.run('set-DRE');
      const network = <eEthereumNetwork>localBRE.network.name;
      const lendingPoolConfigurator = '0x289aa513180f10A9370d4489025E2289cE27425f';
      const lendingPoolProxy = await getLendingPool('0x618BD91EBe2224B7CD433D92532730da10032e08');
      const lendingPoolAddress = await getLendingPoolAddressesProvider(
        '0xe7c6Bc809fB3e8970e0F02b180d2669d64b6065D'
      );
      console.log();
      const poolAddress = '0x618BD91EBe2224B7CD433D92532730da10032e08';
      // XPO: "0xebb59cebfb63f218db6b5094dc14abf34d56d35d",
      // USDT: "0x55d398326f99059ff775485246999027b3197955",
      // DAI: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
      // USDC: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      // BUSD: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      // BNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      // ETH: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
      // BTC: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
      // DOT: "0x7083609fce4d1d8dc0c979aab8c869ea2c873402",
      // LINK: "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd",
      // YFI: "0x88f1a5ae2a3bf98aeaf342d26b30a79438c9142e",
      // CAKE: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"
      const list_asset = [
        // {
        //   "asset": "0xebb59cebfb63f218db6b5094dc14abf34d56d35d",
        //   "symbol": "XPO",
        //   "AToken": "0xFaeA32854E5e85D44bB6763860ABc02785f94115",
        //   "stableDebtToken": "0x9dD0B349fB077cae00C706F03b25433EfC5c62F5",
        //   "variableDebtToken": "0xE7AebA483A0Ef79D4F815787beEc7C212ED76e80",
        //   "optimalUtilizationRate": new BigNumber(0.45).multipliedBy(oneRay).toFixed(),
        //   "baseVariableBorrowRate": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope1": new BigNumber(0.07).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope2": new BigNumber(3).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope1": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope2": new BigNumber(0).multipliedBy(oneRay).toFixed()
        // },
        // {
        //   "asset": "0x55d398326f99059ff775485246999027b3197955",
        //   "symbol": "USDT",
        //   "AToken": "0xF1A38D2782c6e7657136Cb9D7347EC08558ef8Fb",
        //   "stableDebtToken": "0x9dFdFf5eEE3DA32E932479f584dbbFB9E9A29355",
        //   "variableDebtToken": "0x03420D36f42550c65815c9df72aBA7900a7A554F",
        //   "optimalUtilizationRate": new BigNumber(0.9).multipliedBy(oneRay).toFixed(),
        //   "baseVariableBorrowRate": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope1": new BigNumber(0.04).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope2": new BigNumber(0.60).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope1": new BigNumber(0.02).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope2": new BigNumber(0.60).multipliedBy(oneRay).toFixed()
        // },
        // {
        //   "asset": "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
        //   "symbol": "DAI",
        //   "AToken": "0xD06B58D3fe9E6e1314CA1421D1db320c4F0d43f4",
        //   "stableDebtToken": "0x55bf5f90c68B38A62D498E16F5b872ed2b21cbdb",
        //   "variableDebtToken": "0xCB60261a3710102eD228BD40354363a585c0959A",
        //   "optimalUtilizationRate": new BigNumber(0.8).multipliedBy(oneRay).toFixed(),
        //   "baseVariableBorrowRate": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope1": new BigNumber(0.04).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope2": new BigNumber(0.75).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope1": new BigNumber(0.02).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope2": new BigNumber(0.75).multipliedBy(oneRay).toFixed()
        // },
        // {
        //   "asset": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
        //   "symbol": "USDC",
        //   "AToken": "0x3f255aa1FECa7f2505052f6d50922B2B51Ef5C9E",
        //   "stableDebtToken": "0x17f6a5747ee2F6e2E9592d38228B4447f4bbAA5F",
        //   "variableDebtToken": "0x2812c012a39f1FC0D5BFe1D1b845483333E538DD",
        //   "optimalUtilizationRate": new BigNumber(0.9).multipliedBy(oneRay).toFixed(),
        //   "baseVariableBorrowRate": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope1": new BigNumber(0.04).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope2": new BigNumber(0.60).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope1": new BigNumber(0.02).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope2": new BigNumber(0.60).multipliedBy(oneRay).toFixed()
        // },
        // {
        //   "asset": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        //   "symbol": "BUSD",
        //   "AToken": "0x6e4Da41B80ED6A5A41eb0b01C045873dE99b5e8E",
        //   "stableDebtToken": "0xaecAC53df6a2032C4F5E2ab66b1291a6481260d7",
        //   "variableDebtToken": "0x6bF552A1cA1038356E363a841b9257eee7D20bc9",
        //   "optimalUtilizationRate": new BigNumber(0.8).multipliedBy(oneRay).toFixed(),
        //   "baseVariableBorrowRate": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope1": new BigNumber(0.04).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope2": new BigNumber(1).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope1": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope2": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        // },
        // {
        //   "asset": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        //   "symbol": "BNB",
        //   "AToken": "0xd8dABB2CF242a76a451655527Cfab37A48D8232b",
        //   "stableDebtToken": "0xdCC9074469AC79db3A25fCde274B9A1aA2029FC7",
        //   "variableDebtToken": "0x3327702Db3A1E33bc1a73Ef86a8bdF6446Ea3596",
        //   "optimalUtilizationRate": new BigNumber(0.65).multipliedBy(oneRay).toFixed(),
        //   "baseVariableBorrowRate": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope1": new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope2": new BigNumber(0.9).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope1": new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope2": new BigNumber(0.6).multipliedBy(oneRay).toFixed()
        // },
        // {
        //   "asset": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
        //   "symbol": "ETH",
        //   "AToken": "0x17fF563248AAFE646D9FeBAc74eEF0076553e441",
        //   "stableDebtToken": "0xA7bc9Ed69576390f5836880327BA37c25580A5BC",
        //   "variableDebtToken": "0x45b113123B77785a8b69D9293a57f700eF0780e3",
        //   "optimalUtilizationRate": new BigNumber(0.65).multipliedBy(oneRay).toFixed(),
        //   "baseVariableBorrowRate": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope1": new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope2": new BigNumber(1).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope1": new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope2": new BigNumber(1).multipliedBy(oneRay).toFixed()
        // },
        // {
        //   "asset": "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
        //   "symbol": "BTC",
        //   "AToken": "0xF36d7168C8845862bCA3834E3670A7EF8521BE60",
        //   "stableDebtToken": "0x84C4e3a7479826A156De29A88a333F3423b4751B",
        //   "variableDebtToken": "0x5BA8B207Af1f696b636Aac86e63377d82fF1b0B3",
        //   "optimalUtilizationRate": new BigNumber(0.45).multipliedBy(oneRay).toFixed(),
        //   "baseVariableBorrowRate": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope1": new BigNumber(0.07).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope2": new BigNumber(1).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope1": new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope2": new BigNumber(0.6).multipliedBy(oneRay).toFixed()
        // },
        // {
        //   "asset": "0x7083609fce4d1d8dc0c979aab8c869ea2c873402",
        //   "symbol": "DOT",
        //   "AToken": "0xDF2272AFf791426220985489965645539EdC2f3c",
        //   "stableDebtToken": "0x464Ef5e27C13CaafbE87e8F5C85967A4201c9238",
        //   "variableDebtToken": "0x00d4e70526665da41f821480C8d70FE91bef51CB",
        //   "optimalUtilizationRate": new BigNumber(0.45).multipliedBy(oneRay).toFixed(),
        //   "baseVariableBorrowRate": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope1": new BigNumber(0.07).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope2": new BigNumber(3).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope1": new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope2": new BigNumber(3).multipliedBy(oneRay).toFixed()
        // },
        // {
        //   "asset": "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd",
        //   "symbol": "LINK",
        //   "AToken": "0x45c2571Ac224f122d0f75AC9D543e046C1DA55d4",
        //   "stableDebtToken": "0xD46EBd11cfBad7596371aA4aA4cf3b2225f2B822",
        //   "variableDebtToken": "0x3E016F1CFf65fF28835e00caF3e6144163f32895",
        //   "optimalUtilizationRate": new BigNumber(0.45).multipliedBy(oneRay).toFixed(),
        //   "baseVariableBorrowRate": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope1": new BigNumber(0.07).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope2": new BigNumber(3).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope1": new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope2": new BigNumber(3).multipliedBy(oneRay).toFixed()
        // },
        // {
        //   "asset": "0x88f1a5ae2a3bf98aeaf342d26b30a79438c9142e",
        //   "symbol": "YFI",
        //   "AToken": "0x6fd09729EA0C25FBC8cebeEfb4145aEC6914Cb7b",
        //   "stableDebtToken": "0xFE79F6E9808Eb0031FBbE574331629F90dA0Cc96",
        //   "variableDebtToken": "0x028B58D12464B78ef952601014938F9eaE0EA511",
        //   "optimalUtilizationRate": new BigNumber(0.45).multipliedBy(oneRay).toFixed(),
        //   "baseVariableBorrowRate": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope1": new BigNumber(0.07).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope2": new BigNumber(3).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope1": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope2": new BigNumber(0).multipliedBy(oneRay).toFixed()
        // },
        // {
        //   "asset": "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
        //   "symbol": "CAKE",
        //   "AToken": "0x3283013112778758B4193261E5d5Cc3A7928f7a1",
        //   "stableDebtToken": "0x931670532fb1C3854aDDCf1d78721C2c5bEafAB9",
        //   "variableDebtToken": "0xAc764D77Ea530eEcfa7976E81f22CbBd70671D99",
        //   "optimalUtilizationRate": new BigNumber(0.45).multipliedBy(oneRay).toFixed(),
        //   "baseVariableBorrowRate": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope1": new BigNumber(0.07).multipliedBy(oneRay).toFixed(),
        //   "variableRateSlope2": new BigNumber(3).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope1": new BigNumber(0).multipliedBy(oneRay).toFixed(),
        //   "stableRateSlope2": new BigNumber(0).multipliedBy(oneRay).toFixed()
        // },
      ];

      await verifyContract('0xBc190415169C9B4A9D77EAdC06Ebc24840898257', []);
      await verifyContract('0x54059931795bfF328bca1A51Be68c941E0359c02', []);

      for (var asset of list_asset) {
        const reserveData = await lendingPoolProxy.getReserveData(asset['asset']);
        console.log(`a${asset['symbol']}: ${reserveData.aTokenAddress}`);
        console.log(`stableDebt${asset['symbol']}: ${reserveData.stableDebtTokenAddress}`);
        console.log(`variableDebt${asset['symbol']}: ${reserveData.variableDebtTokenAddress}`);
        console.log(`strategy${asset['symbol']}: ${reserveData.interestRateStrategyAddress}`);
        // await verifyContract(reserveData.aTokenAddress, [lendingPoolConfigurator])
        // await verifyContract(reserveData.stableDebtTokenAddress, [lendingPoolConfigurator])
        // await verifyContract(reserveData.variableDebtTokenAddress, [lendingPoolConfigurator])
        const AXPOargs: string[] = [
          poolAddress,
          asset['asset'],
          '0xA007aCF323a87C44E94cCDB0cd227dAF9fdEca38',
          `Aave interest bearing ${asset['symbol']}`,
          `a${asset['symbol']}`,
          ZERO_ADDRESS,
        ];
        await verifyContract(asset['AToken'], AXPOargs);
        const Stableargs: string[] = [
          poolAddress,
          asset['asset'],
          `Aave stable debt bearing ${asset['symbol']}`,
          `stableDebt${asset['symbol']}`,
          ZERO_ADDRESS,
        ];
        await verifyContract(asset['stableDebtToken'], Stableargs);
        const variableargs = [
          poolAddress,
          asset['asset'],
          `Aave variable debt bearing ${asset['symbol']}`,
          `variableDebt${asset['symbol']}`,
          ZERO_ADDRESS,
        ];
        await verifyContract(asset['variableDebtToken'], variableargs);
        // const Strategyargs = [
        //   lendingPoolAddress.address,
        //   asset["optimalUtilizationRate"],
        //   asset["baseVariableBorrowRate"],
        //   asset["variableRateSlope1"],
        //   asset["variableRateSlope2"],
        //   asset["stableRateSlope1"],
        //   asset["stableRateSlope2"]
        // ]
        // console.log(Strategyargs)
        // await verifyContract(reserveData.interestRateStrategyAddress, Strategyargs)
      }
    } catch (err) {
      console.error(err);
      exit(1);
    }
  });
