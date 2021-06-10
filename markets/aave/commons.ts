import BigNumber from 'bignumber.js';
import { oneEther, oneRay, RAY, ZERO_ADDRESS } from '../../helpers/constants';
import { ICommonConfiguration, EthereumNetwork, eEthereumNetwork } from '../../helpers/types';

const ONWER_ADDRESS = "0xc0FFEeF8BdA59b340E68888964E026E6fe69fef9"
export const PRICE_ADDRESS = "0xc0ffee3e342826ab57f158550a8d528c858ea88c"

const MOCK_CHAINLINK_AGGREGATORS_PRICES = {
  AAVE: oneEther.multipliedBy('0.003620948469').toFixed(),
  BAT: oneEther.multipliedBy('0.00137893825230').toFixed(),
  BUSD: oneEther.multipliedBy('0.00736484').toFixed(),
  DAI: oneEther.multipliedBy('0.00369068412860').toFixed(),
  ENJ: oneEther.multipliedBy('0.00029560').toFixed(),
  KNC: oneEther.multipliedBy('0.001072').toFixed(),
  LINK: oneEther.multipliedBy('0.009955').toFixed(),
  MANA: oneEther.multipliedBy('0.000158').toFixed(),
  MKR: oneEther.multipliedBy('2.508581').toFixed(),
  REN: oneEther.multipliedBy('0.00065133').toFixed(),
  SNX: oneEther.multipliedBy('0.00442616').toFixed(),
  SUSD: oneEther.multipliedBy('0.00364714136416').toFixed(),
  TUSD: oneEther.multipliedBy('0.00364714136416').toFixed(),
  UNI: oneEther.multipliedBy('0.00536479').toFixed(),
  USDC: oneEther.multipliedBy('0.00367714136416').toFixed(),
  USDT: oneEther.multipliedBy('0.00369068412860').toFixed(),
  WETH: oneEther.toFixed(),
  WBTC: oneEther.multipliedBy('47.332685').toFixed(),
  YFI: oneEther.multipliedBy('22.407436').toFixed(),
  ZRX: oneEther.multipliedBy('0.001151').toFixed(),
  xSUSHI: oneEther.multipliedBy('0.00913428586').toFixed(),
  USD: '5848466240000000',
};
// ----------------
// PROTOCOL GLOBAL PARAMS
// ----------------

export const CommonsConfig: ICommonConfiguration = {
  MarketId: 'Commons',
  ProviderId: 0,
  ProtocolGlobalParams: {
    TokenDistributorPercentageBase: '10000',
    MockUsdPriceInWei: '5848466240000000',
    UsdAddress: '0x10F7Fc1F91Ba351f9C629c5947AD69bD03C05b96',
    NilAddress: '0x0000000000000000000000000000000000000000',
    OneAddress: '0x0000000000000000000000000000000000000001',
    AaveReferral: '0',
  },

  // ----------------
  // COMMON PROTOCOL PARAMS ACROSS POOLS AND NETWORKS
  // ----------------

  Mocks: {
    AllAssetsInitialPrices: {
      ...MOCK_CHAINLINK_AGGREGATORS_PRICES,
    },
  },
  // TODO: reorg alphabetically, checking the reason of tests failing
  LendingRateOracleRatesCommon: {
    WETH: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    DAI: {
      borrowRate: oneRay.multipliedBy(0.039).toFixed(),
    },
    TUSD: {
      borrowRate: oneRay.multipliedBy(0.035).toFixed(),
    },
    USDC: {
      borrowRate: oneRay.multipliedBy(0.039).toFixed(),
    },
    SUSD: {
      borrowRate: oneRay.multipliedBy(0.035).toFixed(),
    },
    USDT: {
      borrowRate: oneRay.multipliedBy(0.035).toFixed(),
    },
    BAT: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    AAVE: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    LINK: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    KNC: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    MKR: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    MANA: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    WBTC: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    ZRX: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    SNX: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    YFI: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    REN: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    UNI: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    BUSD: {
      borrowRate: oneRay.multipliedBy(0.05).toFixed(),
    },
    JAY: {
      borrowRate: oneRay.multipliedBy(0.05).toFixed(),
    },
    PAL: {
      borrowRate: oneRay.multipliedBy(0.05).toFixed(),
    },
  },
  // ----------------
  // COMMON PROTOCOL ADDRESSES ACROSS POOLS
  // ----------------

  // If PoolAdmin/emergencyAdmin is set, will take priority over PoolAdminIndex/emergencyAdminIndex
  PoolAdmin: {
    [eEthereumNetwork.coverage]: undefined,
    [eEthereumNetwork.buidlerevm]: undefined,
    [eEthereumNetwork.coverage]: undefined,
    [eEthereumNetwork.hardhat]: "0xc783df8a850f42e7f7e57013759c285caa701eb6",
    [eEthereumNetwork.kovan]: ONWER_ADDRESS,
    [eEthereumNetwork.ropsten]: undefined,
    [eEthereumNetwork.main]: undefined,
    [eEthereumNetwork.tenderlyMain]: undefined,
    [eEthereumNetwork.bbtest]: ONWER_ADDRESS,
  },
  PoolAdminIndex: 0,
  EmergencyAdmin: {
    [eEthereumNetwork.hardhat]: "0xc783df8a850f42e7f7e57013759c285caa701eb6",
    [eEthereumNetwork.coverage]: undefined,
    [eEthereumNetwork.buidlerevm]: undefined,
    [eEthereumNetwork.kovan]: ONWER_ADDRESS,
    [eEthereumNetwork.ropsten]: undefined,
    [eEthereumNetwork.main]: undefined,
    [eEthereumNetwork.tenderlyMain]: undefined,
    [eEthereumNetwork.bbtest]: ONWER_ADDRESS,
  },
  EmergencyAdminIndex: 1,
  ProviderRegistry: {
    [eEthereumNetwork.kovan]: '0xE6A23c398D98600e6810E8CB2201B909EA3feF99',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '0x2b8419182A206931C950BB97A55c37f0a0539e75',
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '0x7c2C195CD6D34B8F845992d380aADB2730bB9C6F',
    [eEthereumNetwork.tenderlyMain]: '0x52D306e36E3B6B02c153d0266ff0f85d18BCD413',
    [eEthereumNetwork.bbtest]: '0x4Af0DDc7606de5726c257dbFFe8253d32b48309e',
  },
  ProviderRegistryOwner: {
    [eEthereumNetwork.kovan]: ONWER_ADDRESS,
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '0xbd723fc4f1d737dcfc48a07fe7336766d34cad5f',
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '0xc783df8a850f42e7f7e57013759c285caa701eb6',
    [eEthereumNetwork.buidlerevm]: '0xc783df8a850f42e7f7e57013759c285caa701eb6',
    [eEthereumNetwork.tenderlyMain]: '0xbd723fc4f1d737dcfc48a07fe7336766d34cad5f',
    [eEthereumNetwork.bbtest]: ONWER_ADDRESS,
  },
  LendingRateOracle: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '0x05dcca805a6562c1bdd0423768754acb6993241b',
    [eEthereumNetwork.main]: '0x8A32f49FFbA88aba6EFF96F45D8BD1D4b3f35c7D',
    [eEthereumNetwork.tenderlyMain]: '0x8A32f49FFbA88aba6EFF96F45D8BD1D4b3f35c7D',
    [eEthereumNetwork.bbtest]: ZERO_ADDRESS,
  },
  TokenDistributor: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.hardhat]: '',
    [EthereumNetwork.kovan]: '',
    [EthereumNetwork.ropsten]: '0xeba2ea67942b8250d870b12750b594696d02fc9c',
    [EthereumNetwork.main]: '0xe3d9988f676457123c5fd01297605efdd0cba1ae',
    [EthereumNetwork.tenderlyMain]: '0xe3d9988f676457123c5fd01297605efdd0cba1ae',
    [EthereumNetwork.bbtest]: '',
  },
  AaveOracle: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [EthereumNetwork.kovan]: '',
    [EthereumNetwork.ropsten]: ZERO_ADDRESS,
    [EthereumNetwork.main]: '0xA50ba011c48153De246E5192C8f9258A2ba79Ca9',
    [EthereumNetwork.tenderlyMain]: '0xA50ba011c48153De246E5192C8f9258A2ba79Ca9',
    [EthereumNetwork.bbtest]: '',
  },
  FallbackOracle: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [EthereumNetwork.kovan]: '0xDFe93EC3654A006CCA919ab8266cA2Dd90d8980C',
    [EthereumNetwork.ropsten]: '0xAD1a978cdbb8175b2eaeC47B01404f8AEC5f4F0d',
    [EthereumNetwork.main]: ZERO_ADDRESS,
    [EthereumNetwork.tenderlyMain]: ZERO_ADDRESS,
    [EthereumNetwork.bbtest]: "0x69228aCDa46bB2030dF22DEDdc58CDe05cdb788A",
  },
  ChainlinkAggregator: {
    [eEthereumNetwork.coverage]: {},
    [eEthereumNetwork.hardhat]: {},
    [eEthereumNetwork.buidlerevm]: {},
    [EthereumNetwork.kovan]: {},
    [EthereumNetwork.bbtest]: {
      XPO: ZERO_ADDRESS,
      USDT: "0xD5c40f5144848Bd4EF08a9605d860e727b991513",
      DAI: "0x8EC213E7191488C7873cEC6daC8e97cdbAdb7B35",
      USDC: "0x45f86CA2A8BC9EBD757225B19a1A0D7051bE46Db",
      BUSD: "0x87Ea38c9F24264Ec1Fff41B04ec94a97Caf99941",
      BNB: ZERO_ADDRESS,
      ETH: "0x63D407F32Aa72E63C7209ce1c2F5dA40b3AaE726",
      BTC: "0x116EeB23384451C78ed366D4f67D5AD44eE771A0",
      DOT: "0xBA8683E9c3B1455bE6e18E7768e8cAD95Eb5eD49",
      LINK: "0xB38722F6A608646a538E882Ee9972D15c86Fc597",
      YFI: "0xF841761481DF19831cCC851A54D8350aE6022583",
      CAKE: "0xcB23da9EA243f53194CBc2380A6d4d9bC046161f"
    },
    [EthereumNetwork.ropsten]: {},
    [EthereumNetwork.main]: {},
    [EthereumNetwork.tenderlyMain]: {},
  },
  ReserveAssets: {
    [eEthereumNetwork.coverage]: {},
    [eEthereumNetwork.hardhat]: {},
    [eEthereumNetwork.buidlerevm]: {},
    [EthereumNetwork.main]: {},
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
    [EthereumNetwork.tenderlyMain]: {},
  },
  ReservesConfig: {
  },
  ATokenDomainSeparator: {
    [eEthereumNetwork.coverage]:"",
    [eEthereumNetwork.hardhat]:"",
    [eEthereumNetwork.buidlerevm]: "",
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.bbtest]: '',
  },
  WETH: {
    [eEthereumNetwork.coverage]: '', // deployed in local evm
    [eEthereumNetwork.hardhat]: '', // deployed in local evm
    [eEthereumNetwork.buidlerevm]: '', // deployed in local evm
    [eEthereumNetwork.kovan]: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
    [eEthereumNetwork.ropsten]: '0xc778417e063141139fce010982780140aa0cd5ab',
    [eEthereumNetwork.main]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    [eEthereumNetwork.tenderlyMain]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    [eEthereumNetwork.bbtest]: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  },
  ReserveFactorTreasuryAddress: {
    [eEthereumNetwork.coverage]: '0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c',
    [eEthereumNetwork.hardhat]: '0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c',
    [eEthereumNetwork.buidlerevm]: '0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c',
    [eEthereumNetwork.kovan]: '0xf784709d2317D872237C4bC22f867d1BAe2913AB',
    [eEthereumNetwork.ropsten]: '0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c',
    [eEthereumNetwork.main]: '0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c',
    [eEthereumNetwork.tenderlyMain]: '0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c',
    [eEthereumNetwork.bbtest]: '0xA007aCF323a87C44E94cCDB0cd227dAF9fdEca38',
  },
};
