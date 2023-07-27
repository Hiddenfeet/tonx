import { ChainId } from "@photonswap/sdk"

export const DEFAULT_TOKEN_LIST_URL = 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/cronos-photonswap.json'

export const DEFAULT_LIST_OF_LISTS: string[] = [
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/mumbai-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/cronos-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/cronos-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/bsc-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/evmos-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/evmos-mainnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/kava-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/shardeum-liberty-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/haqq-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/rebus-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/mintme-mainnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/polygon-zk-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/mantle-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/pepe-testnet-photonswap.json', 
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/sepolia-testnet-photonswap.json', 
]

export const DEFAULT_HARDCODED_TOKEN_LIST: { [chainId in ChainId]?: string } = {
  [ChainId.MUMBAI_TESTNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/mumbai-testnet-photonswap.json',
  [ChainId.CRONOSMAINNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/cronos-photonswap.json',
  [ChainId.CRONOSTEST]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/cronos-testnet-photonswap.json',
  [ChainId.BSC_TEST_NET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/bsc-testnet-photonswap.json',
  [ChainId.EVMOS_TESTNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/evmos-testnet-photonswap.json',
  [ChainId.EVMOS_MAINNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/evmos-mainnet-photonswap.json',
  [ChainId.KAVA_TESTNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/kava-testnet-photonswap.json',
  [ChainId.KAVA_MAINNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/kava-mainnet-photonswap.json',
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/shardeum-liberty-testnet-photonswap.json',
  [ChainId.HAQQ_TESTNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/haqq-testnet-photonswap.json',
  [ChainId.REBUS_TESTNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/rebus-testnet-photonswap.json',
  [ChainId.MINTME_MAINNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/mintme-mainnet-photonswap.json',
  [ChainId.MANTLE_TESTNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/mantle-testnet-photonswap.json',  
  [ChainId.POLYGON_ZK_TESTNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/polygon-zk-testnet-photonswap.json',
  [ChainId.PEPE_CHAIN]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/pepe-testnet-photonswap.json', 
  [ChainId.SEPOLIA]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/sepolia-testnet-photonswap.json', 

}
