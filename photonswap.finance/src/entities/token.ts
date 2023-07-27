import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH = {
  [ChainId.CRONOSMAINNET]: new Token(
    ChainId.CRONOSMAINNET,
    '0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23',
    18,
    'WCRO',
    'Wrapped Cronos'
  ),
  [ChainId.CRONOSTEST]: new Token(
    ChainId.CRONOSTEST,
    '0xa85d35eb8E439078a1810Ec3738997E61d157f0d',
    18,
    'WCRO',
    'Wrapped Cronos'
  ),

  [ChainId.BSC_TEST_NET]: new Token(
    ChainId.BSC_TEST_NET,
    '0x6820305F97141dAe62bBacf73a3b09a01edfCBD9',
    18,
    'WBNB',
    'Wrapped BNB'
  ),

  [ChainId.CASSINI]: new Token(
    ChainId.CASSINI,
    '0x77e66C840e7198C95500f7f547543E1466C5CB2c',
    18,
    'WCRO',
    'Wrapped Cronos'
  ),
  [ChainId.MUMBAI_TESTNET]: new Token(
    ChainId.MUMBAI_TESTNET,
    '0x77e66C840e7198C95500f7f547543E1466C5CB2c',
    18,
    'WMATIC',
    'Wrapped Matic'
  ),
  [ChainId.EVMOS_TESTNET]: new Token(
    ChainId.EVMOS_TESTNET,
    '0xc8A2413D8ac65eC936F7350d6FF62ec603004565',
    18,
    'WEVMOS',
    'Wrapped EVMOS'
  ),
  [ChainId.KAVA_TESTNET]: new Token(
    ChainId.KAVA_TESTNET,
    '0xbAAFeC4B6eF4F5E0bAFA850CBC48364B953EFCf9',
    18,
    'WKAVA',
    'Wrapped KAVA'
  ),
  [ChainId.KAVA_MAINNET]: new Token(
    ChainId.KAVA_MAINNET,
    '0xc86c7C0eFbd6A49B35E8714C5f59D99De09A225b',
    18,
    'WKAVA',
    'Wrapped KAVA'
  ),
  [ChainId.MANTLE_TESTNET]: new Token(
    ChainId.MANTLE_TESTNET,
    '0xbAAFeC4B6eF4F5E0bAFA850CBC48364B953EFCf9',
    18,
    'WBIT',
    'Wrapped BIT'
  ),
  [ChainId.SHARDEUM_LIBERTY_TESTNET]: new Token(
    ChainId.SHARDEUM_LIBERTY_TESTNET,
    '0x1c671d6fEC45Ec0de88C82e6D8536bFe33F00c8a',
    18,
    'WSHM',
    'Wrapped SHM'
  ),
  [ChainId.EVMOS_MAINNET]: new Token(
    ChainId.EVMOS_MAINNET,
    '0xD4949664cD82660AaE99bEdc034a0deA8A0bd517',
    18,
    'WEVMOS',
    'Wrapped EVMOS'
  ),

  [ChainId.HAQQ_TESTNET]: new Token(
    ChainId.HAQQ_TESTNET,
    '0xbAAFeC4B6eF4F5E0bAFA850CBC48364B953EFCf9',
    18,
    'WISLM',
    'Wrapped ISLM'
  ),
  [ChainId.REBUS_TESTNET]: new Token(
    ChainId.REBUS_TESTNET,
    '0x1A3d70c6Ba491680393F6a05140B09358A78CFd2',
    18,
    'WREBUS',
    'Wrapped Rebus'
  ),
  [ChainId.MINTME_MAINNET]: new Token(
    ChainId.MINTME_MAINNET,
    '0xa297432E5c707435cd2249f78978206626dcA17C',
    18,
    'WMINTME',
    'Wrapped MINTME'
  ),
  [ChainId.POLYGON_ZK_TESTNET]: new Token(
    ChainId.POLYGON_ZK_TESTNET,
    '0x65A0fC432f88aF171656E707709863E82F3e0775',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.PEPE_CHAIN]: new Token(
    ChainId.PEPE_CHAIN,
    '0xbAAFeC4B6eF4F5E0bAFA850CBC48364B953EFCf9',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.SEPOLIA]: new Token(
    ChainId.SEPOLIA,
    '0xbAAFeC4B6eF4F5E0bAFA850CBC48364B953EFCf9',
    18,
    'WETH',
    'Wrapped Ether'
  ),
}
