import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { DeFiWeb3Connector } from 'deficonnect'
import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'
import { ChainId } from '@photonswap/sdk'

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL
const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY
const PORTIS_ID = process.env.REACT_APP_PORTIS_ID

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1')
export const NETWORK_CHAIN_ID_ENUM: ChainId = getChainIdEnum(NETWORK_CHAIN_ID)
if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL }
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.CRONOSMAINNET,
    ChainId.CRONOSTEST, 
    ChainId.BSC_TEST_NET, 
    ChainId.EVMOS_TESTNET, 
    ChainId.EVMOS_MAINNET,
    ChainId.MUMBAI_TESTNET,
    ChainId.KAVA_TESTNET,
    ChainId.KAVA_MAINNET, 
    ChainId.SHARDEUM_LIBERTY_TESTNET, 
    ChainId.HAQQ_TESTNET, 
    ChainId.REBUS_TESTNET,
    ChainId.MINTME_MAINNET,
    ChainId.POLYGON_ZK_TESTNET,
    ChainId.MANTLE_TESTNET,
    ChainId.PEPE_CHAIN,
    ChainId.SEPOLIA
  ],
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1
})

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [1]
})

// // mainnet only
// export const walletlink = new PortisConnector({
//   dAppId: PORTIS_ID ?? '',
//   networks: [1]
// })
// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Uniswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg'
})

export const defiWalletConnect = new DeFiWeb3Connector({
  supportedChainIds: [ChainId.CRONOSMAINNET],
  rpc: { [ChainId.CRONOSMAINNET]: 'https://gateway.nebkas.ro/' },
  pollingInterval: 15000,
})
function getChainIdEnum(chainIdNumber: number): ChainId{
  switch (chainIdNumber) {
    case ChainId.BSC_TEST_NET:
      return ChainId.BSC_TEST_NET;
    case ChainId.CASSINI:
      return ChainId.CASSINI;
    case ChainId.CRONOSMAINNET:
      return ChainId.CRONOSMAINNET;
    case ChainId.CRONOSTEST:
      return ChainId.CRONOSTEST;
    case ChainId.EVMOS_MAINNET:
      return ChainId.EVMOS_MAINNET;
    case ChainId.EVMOS_TESTNET:
      return ChainId.EVMOS_TESTNET;
    case ChainId.KAVA_MAINNET:
      return ChainId.KAVA_MAINNET;
    case ChainId.KAVA_TESTNET:
      return ChainId.KAVA_TESTNET;
    case ChainId.MUMBAI_TESTNET:
      return ChainId.MUMBAI_TESTNET;
    case ChainId.SHARDEUM_LIBERTY_TESTNET:
      return ChainId.SHARDEUM_LIBERTY_TESTNET;
    case ChainId.HAQQ_TESTNET:
      return ChainId.HAQQ_TESTNET;
    case ChainId.REBUS_TESTNET:
      return ChainId.REBUS_TESTNET;
    case ChainId.MINTME_MAINNET:
      return ChainId.MINTME_MAINNET;
    case ChainId.POLYGON_ZK_TESTNET:
      return ChainId.POLYGON_ZK_TESTNET;
    case ChainId.MANTLE_TESTNET:
      return ChainId.MANTLE_TESTNET;
    case ChainId.PEPE_CHAIN:
      return ChainId.PEPE_CHAIN;
    case ChainId.SEPOLIA:
      return ChainId.SEPOLIA;
  }
  return ChainId.CRONOSMAINNET;
}