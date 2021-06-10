import { oneRay, ZERO_ADDRESS } from '../../helpers/constants';
import { IAaveConfiguration, EthereumNetwork, eEthereumNetwork, IXoolConfiguration } from '../../helpers/types';

import { CommonsConfig } from './commons';
import {
  strategyXPO,
  strategyUSDT,
  strategyDAI,
  strategyUSDC,
  strategyBUSD,
  strategyBNB,
  strategyETH,
  strategyBTC,
  strategyDOT,
  strategyLINK,
  strategyYFI,
  strategyCAKE
} from './reservesConfigs';

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const AaveConfig: IXoolConfiguration = {
  ...CommonsConfig,
  MarketId: 'Aave genesis market',
  ProviderId: 1,
  ReservesConfig: {
    XPO: strategyXPO,
    USDT: strategyUSDT,
    DAI: strategyDAI,
    USDC: strategyUSDC,
    BUSD: strategyBUSD,
    BNB: strategyBNB,
    ETH: strategyETH,
    BTC: strategyBTC,
    DOT: strategyDOT,
    LINK: strategyLINK,
    YFI: strategyYFI,
    CAKE: strategyCAKE

  },
  ReserveAssets: {
    [eEthereumNetwork.buidlerevm]: {},
    [eEthereumNetwork.hardhat]: {},
    [eEthereumNetwork.coverage]: {},
    [EthereumNetwork.kovan]: {},
    [EthereumNetwork.bbtest]: {
      XPO: "0xebb59cebfb63f218db6b5094dc14abf34d56d35d",
      USDT: "0x55d398326f99059ff775485246999027b3197955",
      DAI: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
      USDC: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      BUSD: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      BNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      ETH: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
      BTC: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
      DOT: "0x7083609fce4d1d8dc0c979aab8c869ea2c873402",
      LINK: "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd",
      YFI: "0x88f1a5ae2a3bf98aeaf342d26b30a79438c9142e",
      CAKE: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"
    },
    [EthereumNetwork.ropsten]: {},
    [EthereumNetwork.main]: {},
    [EthereumNetwork.tenderlyMain]: {},
  },
};

export default AaveConfig;
