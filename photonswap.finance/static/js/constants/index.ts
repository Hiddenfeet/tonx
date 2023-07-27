import { ChainId, JSBI, Percent, Token, WETH } from "@photonswap/sdk";
import { AbstractConnector } from "@web3-react/abstract-connector";

import { injected, defiWalletConnect } from "../connectors";

export const ROUTER_ADDRESSES: { [key: string]: string } = {
  [ChainId.CRONOSTEST]: "0x2fFAa0794bf59cA14F268A7511cB6565D55ed40b",
  [ChainId.CRONOSMAINNET]: "0x69004509291F4a4021fA169FafdCFc2d92aD02Aa",
  [ChainId.CASSINI]: "0xbb5ce818AB3afB02d60914e2D1c684B5Df0bA07d",
  [ChainId.BSC_TEST_NET]: "0x331320D83Ca596Fb50Bd042895f761802E97dD35",
  [ChainId.MUMBAI_TESTNET]: "0xbb5ce818AB3afB02d60914e2D1c684B5Df0bA07d",
  [ChainId.EVMOS_TESTNET]: "0x2fe85a78476f8B6d54aA6e1e0598Ba8b82619551",
  [ChainId.EVMOS_MAINNET]: "0x4FD2c40c25Dd40e9Bf0CE8479bA384178b8671b5",
  [ChainId.KAVA_TESTNET]: "0x4FD2c40c25Dd40e9Bf0CE8479bA384178b8671b5",
  [ChainId.KAVA_MAINNET]: "0x8a340F39A468C2FcBFFf2122446a9A0745A313Ad",
  [ChainId.SHARDEUM_LIBERTY_TESTNET]:
    "0x8a340F39A468C2FcBFFf2122446a9A0745A313Ad",
  [ChainId.HAQQ_TESTNET]: "0x4FD2c40c25Dd40e9Bf0CE8479bA384178b8671b5",
  [ChainId.REBUS_TESTNET]: "0x8760d1F05ed592B7C79a4033fC920f8aF6A8b18a",
  [ChainId.MINTME_MAINNET]: "0x3Bef07D24a64ed83a4881861A70ccd3a588ef96a",
  [ChainId.POLYGON_ZK_TESTNET]: "0xe6054516111b56Fb1494c80Cf11D97797Bd0A7a2",
  [ChainId.MANTLE_TESTNET]: "0x4FD2c40c25Dd40e9Bf0CE8479bA384178b8671b5",
  [ChainId.PEPE_CHAIN]: "0xa5B75a13278D216Bc68a57aa57C138DFAF17Ea49",
  [ChainId.SEPOLIA]: "0x4FD2c40c25Dd40e9Bf0CE8479bA384178b8671b5",
};
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const LAIR_ADDRESS = "0xEF08C4323a24B3F2ACE76C75cD6249E3e36C70ff";

export const PHOTONSWAP_VERSION = "v1.0.41";

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[];
};

//export const DAI = new Token(ChainId.CASSINI, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC: { [chainId in ChainId]: Token } = {
  [ChainId.CRONOSMAINNET]: new Token(
    ChainId.CRONOSMAINNET,
    "0xc21223249ca28397b4b6541dffaecc539bff0c59",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.CRONOSTEST]: new Token(
    ChainId.CRONOSTEST,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.CASSINI]: new Token(
    ChainId.CASSINI,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.BSC_TEST_NET]: new Token(
    ChainId.BSC_TEST_NET,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.MUMBAI_TESTNET]: new Token(
    ChainId.MUMBAI_TESTNET,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.EVMOS_TESTNET]: new Token(
    ChainId.EVMOS_TESTNET,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.EVMOS_MAINNET]: new Token(
    ChainId.EVMOS_MAINNET,
    "0x51e44FfaD5C2B122C8b635671FCC8139dc636E82",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.KAVA_TESTNET]: new Token(
    ChainId.KAVA_TESTNET,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.KAVA_MAINNET]: new Token(
    ChainId.KAVA_MAINNET,
    "0xfA9343C3897324496A05fC75abeD6bAC29f8A40f",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: new Token(
    ChainId.SHARDEUM_LIBERTY_TESTNET,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.HAQQ_TESTNET]: new Token(
    ChainId.HAQQ_TESTNET,
    "0xac7605d08AcB3726bfb53422a2B100BeC3819fd6",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.REBUS_TESTNET]: new Token(
    ChainId.REBUS_TESTNET,
    "0xEe427E5C34209bCd33792adFD06B96a1eB0c2323",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.MINTME_MAINNET]: new Token(
    ChainId.MINTME_MAINNET,
    "0xDcB579AA78e35e34581c72c291D493105949ac27",
    6,
    "USDC",
    "USD//C"
  ),
  [ChainId.POLYGON_ZK_TESTNET]: new Token(
    ChainId.POLYGON_ZK_TESTNET,
    "0xDcB579AA78e35e34581c72c291D493105949ac27",
    6,
    "USDC",
    "USD//C"
  ),


  [ChainId.MANTLE_TESTNET]: new Token(
    ChainId.MANTLE_TESTNET,
    "0xDcB579AA78e35e34581c72c291D493105949ac27",
    6,
    "USDC",
    "USD//C"
  ),

  [ChainId.PEPE_CHAIN]: new Token(
    ChainId.PEPE_CHAIN,
    "0xa96b215232Df8bdA254d315A9B4685bf29dea225",
    6,
    "USDC",
    "USD//C"
  ),

  [ChainId.SEPOLIA]: new Token(
    ChainId.SEPOLIA,
    "0xA41b148AeCa0823292D370f95479C10630eC95CD",
    6,
    "USDC",
    "USD//C"
  ),
};

export const USDT: { [chainId in ChainId]: Token } = {
  [ChainId.CRONOSMAINNET]: new Token(
    ChainId.CRONOSMAINNET,
    "0x66e428c3f67a68878562e79A0234c1F83c208770",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.CRONOSTEST]: new Token(
    ChainId.CRONOSTEST,
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.CASSINI]: new Token(
    ChainId.CASSINI,
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.BSC_TEST_NET]: new Token(
    ChainId.BSC_TEST_NET,
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.MUMBAI_TESTNET]: new Token(
    ChainId.MUMBAI_TESTNET,
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.EVMOS_TESTNET]: new Token(
    ChainId.EVMOS_TESTNET,
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.EVMOS_MAINNET]: new Token(
    ChainId.EVMOS_MAINNET,
    "0x7FF4a56B32ee13D7D4D405887E0eA37d61Ed919e",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.KAVA_TESTNET]: new Token(
    ChainId.KAVA_TESTNET,
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.KAVA_MAINNET]: new Token(
    ChainId.KAVA_MAINNET,
    "0xb44a9b6905af7c801311e8f4e76932ee959c663c",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: new Token(
    ChainId.SHARDEUM_LIBERTY_TESTNET,
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.HAQQ_TESTNET]: new Token(
    ChainId.HAQQ_TESTNET,
    "0x948c144bD2e68c5754D0d7825296a1c567af4a0c",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.REBUS_TESTNET]: new Token(
    ChainId.REBUS_TESTNET,
    "0x948c144bD2e68c5754D0d7825296a1c567af4a0c",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.MINTME_MAINNET]: new Token(
    ChainId.MINTME_MAINNET,
    "0xAaE3F40C4D02C9CFA7d5cb6F371226B3FA9C8fc8",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.POLYGON_ZK_TESTNET]: new Token(
    ChainId.POLYGON_ZK_TESTNET,
    "0xAaE3F40C4D02C9CFA7d5cb6F371226B3FA9C8fc8",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.MANTLE_TESTNET]: new Token(
    ChainId.MANTLE_TESTNET,
    "0xAaE3F40C4D02C9CFA7d5cb6F371226B3FA9C8fc8",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.PEPE_CHAIN]: new Token(
    ChainId.PEPE_CHAIN,
    "0xE7391693bCE3916b31e785bEB962974f75246EC4",
    6,
    "USDT",
    "Tether USD"
  ),
  [ChainId.SEPOLIA]: new Token(
    ChainId.SEPOLIA,
    "0xa96b215232Df8bdA254d315A9B4685bf29dea225",
    6,
    "USDT",
    "Tether USD"
  ),
};



// TODO this is only approximate, it's actually based on blocks
export const PROPOSAL_LENGTH_IN_DAYS = 7;

export const GOVERNANCE_ADDRESS = "0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F";

export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.CRONOSMAINNET]: new Token(
    ChainId.CRONOSMAINNET,
    "0xbdd4e5660839a088573191A9889A262c0Efc0983",
    18,
    "PHOTON",
    "PhotonSwap"
  ),
  [ChainId.CRONOSTEST]: new Token(
    ChainId.CRONOSTEST,
    "0xCea2b0c503ae691c8AAeC0431E9C0431Ce096Da6",
    18,
    "PHOTON",
    "PhotonSwap"
  ),
  [ChainId.BSC_TEST_NET]: new Token(
    ChainId.BSC_TEST_NET,
    "0x7a9F89bcef3840eccC218293aEd7B1317CF077c9",
    18,
    "PHOTON",
    "PhotonSwap"
  ),
  [ChainId.CASSINI]: new Token(
    ChainId.CASSINI,
    "0x7a9F89bcef3840eccC218293aEd7B1317CF077c9",
    18,
    "PHOTON",
    "PhotonSwap"
  ),
  [ChainId.MUMBAI_TESTNET]: new Token(
    ChainId.MUMBAI_TESTNET,
    "0x7a9F89bcef3840eccC218293aEd7B1317CF077c9",
    18,
    "PHOTON",
    "PhotonSwap"
  ),
  [ChainId.EVMOS_TESTNET]: new Token(
    ChainId.EVMOS_TESTNET,
    "0x091267bc63B3d00ea8Db5A2831A289c5d882128c",
    18,
    "PHOTON",
    "PhotonSwap"
  ),
  [ChainId.EVMOS_MAINNET]: new Token(
    ChainId.EVMOS_MAINNET,
    "0xD53c77C895A77071D4b2E8CE8867D2914e7b481A",
    18,
    "EV-PHOTON",
    "PhotonSwap(EvmOS)"
  ),
  [ChainId.KAVA_TESTNET]: new Token(
    ChainId.KAVA_TESTNET,
    "0xA8eFf8BB28c6193CBE8BcFb8276e9b1dD3380B13",
    18,
    "PHOTON",
    "PhotonSwap"
  ),
  [ChainId.KAVA_MAINNET]: new Token(
    ChainId.KAVA_MAINNET,
    "0x2fe85a78476f8B6d54aA6e1e0598Ba8b82619551",
    18,
    "K-PHOTON",
    "PhotonSwap(Kava)"
  ),
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: new Token(
    ChainId.SHARDEUM_LIBERTY_TESTNET,
    "0xa5B75a13278D216Bc68a57aa57C138DFAF17Ea49",
    18,
    "PHOTON",
    "PhotonSwap"
  ),
  [ChainId.HAQQ_TESTNET]: new Token(
    ChainId.HAQQ_TESTNET,
    "0xA8eFf8BB28c6193CBE8BcFb8276e9b1dD3380B13",
    18,
    "PHOTON",
    "PhotonSwap"
  ),
  [ChainId.REBUS_TESTNET]: new Token(
    ChainId.REBUS_TESTNET,
    "0xa96b215232Df8bdA254d315A9B4685bf29dea225",
    18,
    "PHOTON",
    "PhotonSwap"
  ),
  [ChainId.MINTME_MAINNET]: new Token(
    ChainId.MINTME_MAINNET,
    "0xBf4d92ACe7d60ec65744c271E9ed1Cc75e44d6f9",
    18,
    "M-PHOTON",
    "PhotonSwap(MintMe)"
  ),
  [ChainId.POLYGON_ZK_TESTNET]: new Token(
    ChainId.POLYGON_ZK_TESTNET,
    "0x74002c753FeF350b74f6592b4b66541c1408E0aC",
    18,
    "zkPHOTON",
    "Photonswap(PolygonZKEVM)"
  ),
  [ChainId.MANTLE_TESTNET]: new Token(
    ChainId.MANTLE_TESTNET,
    "0xFe1919914Ea7a3Dd622cd3D3495d21D4218aA360",
    18,
    "M-PHOTON",
    "Photonswap(Mantle)"
  ),
  [ChainId.PEPE_CHAIN]: new Token(
    ChainId.PEPE_CHAIN,
    "0xA8eFf8BB28c6193CBE8BcFb8276e9b1dD3380B13",
    18,
    "M-PHOTON",
    "Photonswap(PEPE-Chain)"
  ),
  [ChainId.SEPOLIA]: new Token(
    ChainId.SEPOLIA,
    "0xA8eFf8BB28c6193CBE8BcFb8276e9b1dD3380B13",
    18,
    "PHOTON",
    "Photonswap(Sepolia)"
  ),
};

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.CRONOSTEST]: "0x090D4613473dEE047c3f2706764f49E0821D256e",
};

export const WETH_ONLY: ChainTokenList = {
  [ChainId.CRONOSMAINNET]: [WETH[ChainId.CRONOSMAINNET]],
  [ChainId.CRONOSTEST]: [WETH[ChainId.CRONOSTEST]],
  [ChainId.BSC_TEST_NET]: [WETH[ChainId.BSC_TEST_NET]],
  [ChainId.CASSINI]: [WETH[ChainId.CASSINI]],
  [ChainId.MUMBAI_TESTNET]: [WETH[ChainId.MUMBAI_TESTNET]],
  [ChainId.EVMOS_TESTNET]: [WETH[ChainId.EVMOS_TESTNET]],
  [ChainId.EVMOS_MAINNET]: [WETH[ChainId.EVMOS_MAINNET]],
  [ChainId.KAVA_TESTNET]: [WETH[ChainId.KAVA_TESTNET]],
  [ChainId.KAVA_MAINNET]: [WETH[ChainId.KAVA_MAINNET]],
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: [WETH[ChainId.SHARDEUM_LIBERTY_TESTNET]],
  [ChainId.HAQQ_TESTNET]: [WETH[ChainId.HAQQ_TESTNET]],
  [ChainId.REBUS_TESTNET]: [WETH[ChainId.REBUS_TESTNET]],
  [ChainId.MINTME_MAINNET]: [WETH[ChainId.MINTME_MAINNET]],
  [ChainId.POLYGON_ZK_TESTNET]: [WETH[ChainId.POLYGON_ZK_TESTNET]],
  [ChainId.MANTLE_TESTNET]: [WETH[ChainId.MANTLE_TESTNET]],
  [ChainId.PEPE_CHAIN]: [WETH[ChainId.PEPE_CHAIN]],
  [ChainId.SEPOLIA]: [WETH[ChainId.SEPOLIA]],
};

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.CRONOSMAINNET]: [...WETH_ONLY[ChainId.CRONOSMAINNET]],
  [ChainId.CRONOSTEST]: [...WETH_ONLY[ChainId.CRONOSTEST]],
  [ChainId.CASSINI]: [...WETH_ONLY[ChainId.CASSINI]],
  [ChainId.MUMBAI_TESTNET]: [...WETH_ONLY[ChainId.MUMBAI_TESTNET]],
  [ChainId.BSC_TEST_NET]: [...WETH_ONLY[ChainId.BSC_TEST_NET]],
  [ChainId.EVMOS_MAINNET]: [...WETH_ONLY[ChainId.EVMOS_MAINNET]],
  [ChainId.EVMOS_TESTNET]: [...WETH_ONLY[ChainId.EVMOS_TESTNET]],
  [ChainId.KAVA_TESTNET]: [...WETH_ONLY[ChainId.KAVA_TESTNET]],
  [ChainId.KAVA_MAINNET]: [...WETH_ONLY[ChainId.KAVA_MAINNET]],
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: [
    ...WETH_ONLY[ChainId.SHARDEUM_LIBERTY_TESTNET],
  ],
  [ChainId.HAQQ_TESTNET]: [...WETH_ONLY[ChainId.HAQQ_TESTNET]],
  [ChainId.REBUS_TESTNET]: [...WETH_ONLY[ChainId.REBUS_TESTNET]],
  [ChainId.MINTME_MAINNET]: [...WETH_ONLY[ChainId.MINTME_MAINNET]],
  [ChainId.MANTLE_TESTNET]: [...WETH_ONLY[ChainId.MANTLE_TESTNET]],
  [ChainId.PEPE_CHAIN]: [...WETH_ONLY[ChainId.PEPE_CHAIN]],
  [ChainId.SEPOLIA]: [...WETH_ONLY[ChainId.SEPOLIA]],
};

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: {
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] };
} = {
  // [ChainId.CRONOSMAINNET]: {
  //   [AMPL.address]: [USDC[ChainId.CRONOSMAINNET], WETH[ChainId.CRONOSMAINNET]]
  // }
};

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.CRONOSMAINNET]: [
    ...WETH_ONLY[ChainId.CRONOSMAINNET],
    USDT[ChainId.CRONOSMAINNET],
    USDC[ChainId.CRONOSMAINNET],
    UNI[ChainId.CRONOSMAINNET],
  ],
  [ChainId.CASSINI]: [...WETH_ONLY[ChainId.CASSINI], USDT[ChainId.CASSINI]],
  [ChainId.MUMBAI_TESTNET]: [
    ...WETH_ONLY[ChainId.MUMBAI_TESTNET],
    USDT[ChainId.MUMBAI_TESTNET],
  ],
  [ChainId.BSC_TEST_NET]: [
    ...WETH_ONLY[ChainId.BSC_TEST_NET],
    USDT[ChainId.BSC_TEST_NET],
  ],
  [ChainId.EVMOS_MAINNET]: [
    ...WETH_ONLY[ChainId.EVMOS_MAINNET],
    USDT[ChainId.EVMOS_MAINNET],
  ],
  [ChainId.EVMOS_TESTNET]: [
    ...WETH_ONLY[ChainId.EVMOS_TESTNET],
    USDT[ChainId.EVMOS_TESTNET],
  ],
  [ChainId.KAVA_TESTNET]: [
    ...WETH_ONLY[ChainId.KAVA_TESTNET],
    USDT[ChainId.KAVA_TESTNET],
  ],
  [ChainId.KAVA_MAINNET]: [
    ...WETH_ONLY[ChainId.KAVA_MAINNET],
    USDT[ChainId.KAVA_MAINNET],
  ],
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: [
    ...WETH_ONLY[ChainId.SHARDEUM_LIBERTY_TESTNET],
    USDT[ChainId.SHARDEUM_LIBERTY_TESTNET],
  ],
  [ChainId.HAQQ_TESTNET]: [
    ...WETH_ONLY[ChainId.HAQQ_TESTNET],
    USDT[ChainId.HAQQ_TESTNET],
  ],
  [ChainId.REBUS_TESTNET]: [
    ...WETH_ONLY[ChainId.REBUS_TESTNET],
    USDT[ChainId.REBUS_TESTNET],
  ],
  [ChainId.MINTME_MAINNET]: [
    ...WETH_ONLY[ChainId.MINTME_MAINNET],
    USDT[ChainId.MINTME_MAINNET],
  ],
  [ChainId.MANTLE_TESTNET]: [
    ...WETH_ONLY[ChainId.MANTLE_TESTNET],
    USDT[ChainId.MANTLE_TESTNET],
  ],
  [ChainId.PEPE_CHAIN]: [
    ...WETH_ONLY[ChainId.PEPE_CHAIN],
    USDT[ChainId.PEPE_CHAIN],
  ],
  [ChainId.SEPOLIA]: [
    ...WETH_ONLY[ChainId.SEPOLIA],
    USDT[ChainId.SEPOLIA],
  ],
};

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.CRONOSMAINNET]: [
    ...WETH_ONLY[ChainId.CRONOSMAINNET],
    UNI[ChainId.CRONOSMAINNET],
  ],
  [ChainId.CRONOSTEST]: [
    ...WETH_ONLY[ChainId.CRONOSTEST],
    UNI[ChainId.CRONOSTEST],
  ],
  [ChainId.CASSINI]: [...WETH_ONLY[ChainId.CASSINI], UNI[ChainId.CASSINI]],
  [ChainId.BSC_TEST_NET]: [
    ...WETH_ONLY[ChainId.BSC_TEST_NET],
    UNI[ChainId.BSC_TEST_NET],
  ],
  [ChainId.EVMOS_MAINNET]: [
    ...WETH_ONLY[ChainId.EVMOS_MAINNET],
    UNI[ChainId.EVMOS_MAINNET],
  ],
  [ChainId.EVMOS_TESTNET]: [
    ...WETH_ONLY[ChainId.EVMOS_TESTNET],
    UNI[ChainId.EVMOS_TESTNET],
  ],
  [ChainId.MUMBAI_TESTNET]: [
    ...WETH_ONLY[ChainId.MUMBAI_TESTNET],
    UNI[ChainId.MUMBAI_TESTNET],
  ],
  [ChainId.KAVA_TESTNET]: [
    ...WETH_ONLY[ChainId.KAVA_TESTNET],
    UNI[ChainId.KAVA_TESTNET],
  ],
  [ChainId.KAVA_MAINNET]: [
    ...WETH_ONLY[ChainId.KAVA_MAINNET],
    UNI[ChainId.KAVA_MAINNET],
  ],
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: [
    ...WETH_ONLY[ChainId.SHARDEUM_LIBERTY_TESTNET],
    UNI[ChainId.SHARDEUM_LIBERTY_TESTNET],
  ],
  [ChainId.HAQQ_TESTNET]: [
    ...WETH_ONLY[ChainId.HAQQ_TESTNET],
    UNI[ChainId.HAQQ_TESTNET],
  ],
  [ChainId.REBUS_TESTNET]: [
    ...WETH_ONLY[ChainId.REBUS_TESTNET],
    UNI[ChainId.REBUS_TESTNET],
  ],
  [ChainId.MINTME_MAINNET]: [
    ...WETH_ONLY[ChainId.MINTME_MAINNET],
    UNI[ChainId.MINTME_MAINNET],
  ],
  [ChainId.MANTLE_TESTNET]: [
    ...WETH_ONLY[ChainId.MANTLE_TESTNET],
    UNI[ChainId.MANTLE_TESTNET],
  ],
  [ChainId.PEPE_CHAIN]: [
    ...WETH_ONLY[ChainId.PEPE_CHAIN],
    UNI[ChainId.PEPE_CHAIN],
  ],
  [ChainId.SEPOLIA]: [
    ...WETH_ONLY[ChainId.SEPOLIA],
    UNI[ChainId.SEPOLIA],
  ],
};

export const PINNED_PAIRS: {
  readonly [chainId in ChainId]?: [Token, Token][];
} = {
  [ChainId.CRONOSMAINNET]: [
    [WETH[ChainId.CRONOSMAINNET], UNI[ChainId.CRONOSMAINNET]],
  ],
  [ChainId.CRONOSTEST]: [[WETH[ChainId.CRONOSTEST], UNI[ChainId.CRONOSTEST]]],
  [ChainId.BSC_TEST_NET]: [
    [WETH[ChainId.BSC_TEST_NET], UNI[ChainId.BSC_TEST_NET]],
  ],
  [ChainId.CASSINI]: [[WETH[ChainId.CASSINI], UNI[ChainId.CASSINI]]],
  [ChainId.MUMBAI_TESTNET]: [
    [WETH[ChainId.MUMBAI_TESTNET], UNI[ChainId.MUMBAI_TESTNET]],
  ],
  [ChainId.KAVA_TESTNET]: [
    [WETH[ChainId.KAVA_TESTNET], UNI[ChainId.KAVA_TESTNET]],
  ],
  [ChainId.KAVA_MAINNET]: [
    [WETH[ChainId.KAVA_MAINNET], UNI[ChainId.KAVA_MAINNET]],
  ],
  [ChainId.EVMOS_MAINNET]: [
    [WETH[ChainId.EVMOS_MAINNET], UNI[ChainId.EVMOS_MAINNET]],
  ],
  [ChainId.EVMOS_TESTNET]: [
    [WETH[ChainId.EVMOS_TESTNET], UNI[ChainId.EVMOS_TESTNET]],
  ],
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: [
    [
      WETH[ChainId.SHARDEUM_LIBERTY_TESTNET],
      UNI[ChainId.SHARDEUM_LIBERTY_TESTNET],
    ],
  ],
  [ChainId.HAQQ_TESTNET]: [
    [WETH[ChainId.HAQQ_TESTNET], UNI[ChainId.HAQQ_TESTNET]],
  ],
  [ChainId.REBUS_TESTNET]: [
    [WETH[ChainId.REBUS_TESTNET], UNI[ChainId.REBUS_TESTNET]],
  ],
  [ChainId.MINTME_MAINNET]: [
    [WETH[ChainId.MINTME_MAINNET], UNI[ChainId.MINTME_MAINNET]],
  ],
  [ChainId.MANTLE_TESTNET]: [
    [WETH[ChainId.MANTLE_TESTNET], UNI[ChainId.MANTLE_TESTNET]],
  ],
  [ChainId.PEPE_CHAIN]: [
    [WETH[ChainId.PEPE_CHAIN], UNI[ChainId.PEPE_CHAIN]],
  ],
  [ChainId.SEPOLIA]: [
    [WETH[ChainId.SEPOLIA], UNI[ChainId.SEPOLIA]],
  ],
};

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconName: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: "Injected",
    iconName: "arrow-right.svg",
    description: "Injected web3 provider.",
    href: null,
    color: "#010101",
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: "MetaMask",
    iconName: "metamask.png",
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
  },
  DEFI_WALLET: {
    connector: defiWalletConnect,
    name: "DeFi Wallet",
    iconName: "cro.png",
    description: "Login using DeFi wallet",
    href: null,
    color: "#4A6C9B",
    mobile: true,
  },
};
// const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
//   [ChainId.CRONOSTEST]: 'Cronos',
//   [ChainId.BSC_TEST_NET]: 'Binance Smart Chain',
// }

export const CHAIN_NAME: { [chainId in ChainId]: string } = {
  [ChainId.CRONOSMAINNET]: "Cronos",
  [ChainId.CRONOSTEST]: "Cronos (Testnet)",
  [ChainId.BSC_TEST_NET]: "BSC (Testnet)",
  [ChainId.CASSINI]: "Cassini",
  [ChainId.MUMBAI_TESTNET]: "Mumbai(Matic)",
  [ChainId.EVMOS_TESTNET]: "EVMOS (Testnet)",
  [ChainId.EVMOS_MAINNET]: "EVMOS",
  [ChainId.KAVA_TESTNET]: "KAVA (Testnet)",
  [ChainId.KAVA_MAINNET]: "KAVA (Mainnet)",
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: "Shardeum (Liberty)",
  [ChainId.HAQQ_TESTNET]: "Haqq (Testnet)",
  [ChainId.REBUS_TESTNET]: "Rebus (Testnet)",
  [ChainId.MINTME_MAINNET]: "MintMe",
  [ChainId.POLYGON_ZK_TESTNET]: "Polygon zkEVM(Testnet)",
  [ChainId.MANTLE_TESTNET]: "Mantle(Testnet)",
  [ChainId.PEPE_CHAIN]: "PePeChain(Testnet)",
  [ChainId.SEPOLIA]: "Sepolia(Testnet)",
};

export const CHAIN_SYMBOL: { [chainId in ChainId]: string } = {
  [ChainId.CRONOSMAINNET]: "CRO",
  [ChainId.CRONOSTEST]: "CRO",
  [ChainId.BSC_TEST_NET]: "BNB",
  [ChainId.CASSINI]: "CRO",
  [ChainId.MUMBAI_TESTNET]: "MATIC",
  [ChainId.EVMOS_TESTNET]: "EVMOS",
  [ChainId.EVMOS_MAINNET]: "EVMOS",
  [ChainId.KAVA_TESTNET]: "KAVA",
  [ChainId.KAVA_MAINNET]: "KAVA",
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: "SHM",
  [ChainId.HAQQ_TESTNET]: "ISLM",
  [ChainId.REBUS_TESTNET]: "REBUS",
  [ChainId.MINTME_MAINNET]: "MINTME",
  [ChainId.POLYGON_ZK_TESTNET]: "ETH",
  [ChainId.MANTLE_TESTNET]: "BIT",
  [ChainId.PEPE_CHAIN]: "ETH",
  [ChainId.SEPOLIA]: "ETH",
};

export const CHAIN_W_SYMBOL: { [chainId in ChainId]: string } = {
  [ChainId.CRONOSMAINNET]: "wCRO",
  [ChainId.CRONOSTEST]: "wCRO",
  [ChainId.CASSINI]: "wCRO",
  [ChainId.BSC_TEST_NET]: "wBNB",
  [ChainId.MUMBAI_TESTNET]: "wMATIC",
  [ChainId.EVMOS_TESTNET]: "wEVMOS",
  [ChainId.EVMOS_MAINNET]: "wEVMOS",
  [ChainId.KAVA_TESTNET]: "wKAVA",
  [ChainId.KAVA_MAINNET]: "wKAVA",
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: "wSHM",
  [ChainId.HAQQ_TESTNET]: "wISLM",
  [ChainId.REBUS_TESTNET]: "wREBUS",
  [ChainId.MINTME_MAINNET]: "wMINTME",
  [ChainId.POLYGON_ZK_TESTNET]: "wETH",
  [ChainId.MANTLE_TESTNET]: "wBIT",
  [ChainId.PEPE_CHAIN]: "wETH",
  [ChainId.SEPOLIA]: "wETH",
};

export const CHAIN_EXPOLRER: { [chainId in ChainId]: string } = {
  [ChainId.CRONOSMAINNET]: "https://cronoscan.com",
  [ChainId.CRONOSTEST]: "https://cronos-explorer.crypto.org",
  [ChainId.CASSINI]: "https://cronos.crypto.org/cassini/explorer",
  [ChainId.BSC_TEST_NET]: "https://testnet.bscscan.com",
  [ChainId.MUMBAI_TESTNET]: "https://mumbai.polygonscan.com",
  [ChainId.EVMOS_TESTNET]: "https://evm.evmos.dev",
  [ChainId.EVMOS_MAINNET]: "https://evm.evmos.org",
  [ChainId.KAVA_TESTNET]: "https://explorer.evm-alpha.kava.io",
  [ChainId.KAVA_MAINNET]: "https://explorer.kava.io",
  [ChainId.SHARDEUM_LIBERTY_TESTNET]:
    "http://explorer-liberty10.shardeum.org:5555",
  [ChainId.HAQQ_TESTNET]: "https://explorer.testedge.haqq.network",
  [ChainId.REBUS_TESTNET]: "https://testnet.bscscan.com",
  [ChainId.MINTME_MAINNET]: "https://mintme.com/explorer",
  [ChainId.POLYGON_ZK_TESTNET]: "https://public.zkevm-test.net:8443",
  [ChainId.MANTLE_TESTNET]: "https://explorer.testnet.mantle.xyz",
  [ChainId.PEPE_CHAIN]: "https://explorerl2-pepechain-testnet-8uk55qlld4.t.conduit.xyz",
  [ChainId.SEPOLIA]: "https://sepolia.etherscan.io",
};

export const CHAIN_INFO_CHARTS: { [chainId in ChainId]: string | undefined } = {
  [ChainId.CRONOSMAINNET]: "https://info.photonswap.finance",
  [ChainId.CRONOSTEST]: undefined,
  [ChainId.CASSINI]: undefined,
  [ChainId.BSC_TEST_NET]: undefined,
  [ChainId.MUMBAI_TESTNET]: undefined,
  [ChainId.EVMOS_TESTNET]: undefined,
  [ChainId.EVMOS_MAINNET]: undefined,
  [ChainId.KAVA_TESTNET]: undefined,
  [ChainId.KAVA_MAINNET]: "https://kavainfo.photonswap.finance",
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: undefined,
  [ChainId.HAQQ_TESTNET]: undefined,
  [ChainId.REBUS_TESTNET]: undefined,
  [ChainId.MINTME_MAINNET]: undefined,
  [ChainId.POLYGON_ZK_TESTNET]: undefined,
  [ChainId.MANTLE_TESTNET]: undefined,
  [ChainId.PEPE_CHAIN]: undefined,
  [ChainId.SEPOLIA]: undefined,
};

export const CHAIN_SUPPORTED_BRIGES: { [chainId in ChainId]: string[][] } = {
  [ChainId.CRONOSMAINNET]: [
    ["Multichain", "https://app.multichain.org/"],
    ["EVODeFi", "https://bridge.evodefi.com/"],
  ],
  [ChainId.CRONOSTEST]: [],
  [ChainId.CASSINI]: [],
  [ChainId.BSC_TEST_NET]: [],
  [ChainId.MUMBAI_TESTNET]: [],
  [ChainId.EVMOS_TESTNET]: [],
  [ChainId.EVMOS_MAINNET]: [["Multichain", "https://app.multichain.org/"]],
  [ChainId.KAVA_TESTNET]: [],
  [ChainId.KAVA_MAINNET]: [["Multichain", "https://app.multichain.org/"]],
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: [],
  [ChainId.HAQQ_TESTNET]: [],
  [ChainId.REBUS_TESTNET]: [],
  [ChainId.MINTME_MAINNET]: [["Multichain", "https://app.multichain.org/"]],
  [ChainId.POLYGON_ZK_TESTNET]: [["Polygon Bridge", "https://public.zkevm-test.net/"]],
  [ChainId.MANTLE_TESTNET]: [["Mantle Bridge", "https://bridge.testnet.mantle.xyz/"]],
  [ChainId.PEPE_CHAIN]: [],
  [ChainId.SEPOLIA]: [],
};

export const NetworkContextName = "NETWORK";

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;

export const BIG_INT_ZERO = JSBI.BigInt(0);

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));
export const BIPS_BASE = JSBI.BigInt(10000);
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(
  JSBI.BigInt(100),
  BIPS_BASE
); // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(
  JSBI.BigInt(300),
  BIPS_BASE
); // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(
  JSBI.BigInt(500),
  BIPS_BASE
); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(
  JSBI.BigInt(1000),
  BIPS_BASE
); // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(
  JSBI.BigInt(1500),
  BIPS_BASE
); // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(
  JSBI.BigInt(10),
  JSBI.BigInt(16)
); // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(
  JSBI.BigInt(75),
  JSBI.BigInt(10000)
);
