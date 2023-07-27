import JSBI from 'jsbi'
import { ChainId } from '..'
import { SolidityType } from '../constants'
import { validateSolidityTypeInstance } from '../utils'
/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export class Currency {
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string


  /**
   * The only instance of the base class `Currency`.
   */
  public static readonly ETHER: Currency = new Currency(18, 'ETHER', 'Eth')
  public static readonly BNB: Currency = new Currency(18, 'BNB', 'BNB')
  public static readonly CRO: Currency = new Currency(18, 'CRO', 'CRO')
  public static readonly MATIC: Currency = new Currency(18, 'MATIC', 'Matic')
  public static readonly EVMOS: Currency = new Currency(18, 'EVMOS', 'EVMOS')
  public static readonly KAVA: Currency = new Currency(18, 'KAVA', 'KAVA')
  public static readonly SHARDEUM: Currency = new Currency(18, 'SHM', 'SHARDEUM')
  public static readonly ISLM: Currency = new Currency(18, 'ISLM', 'ISLAMCOIN')
  public static readonly REBUS: Currency = new Currency(18, 'REBUS', 'REBUS')
  public static readonly MINTME: Currency = new Currency(18, 'MINTME', 'MINTME')


  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(decimals: number, symbol?: string, name?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8);
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }
  public getDisplaySymbol(chainId: ChainId | undefined): string | undefined {
    if (this.symbol == 'ETHER') {
      switch (chainId) {
        case ChainId.BSC_TEST_NET:
          return "BNB"
        case ChainId.CRONOSTEST:
        case ChainId.CRONOSMAINNET:
        case ChainId.CASSINI:
          return "CRO"
        case ChainId.MUMBAI_TESTNET:
          return "MATIC"
        case ChainId.EVMOS_TESTNET:
        case ChainId.EVMOS_MAINNET:
          return "EVMOS"
        case ChainId.KAVA_TESTNET:
        case ChainId.KAVA_MAINNET:
          return "KAVA"
        case ChainId.SHARDEUM_LIBERTY_TESTNET:
          return "SHM"
        case ChainId.HAQQ_TESTNET:
          return "ISLM"
        case ChainId.REBUS_TESTNET:
          return "REBUS"
        case ChainId.MINTME_MAINNET:
          return "MINTME"
        case ChainId.POLYGON_ZK_TESTNET:
          return "ETHER"
        case ChainId.MANTLE_TESTNET:
          return "BIT"
        case ChainId.PEPE_CHAIN:
          return "ETH"
        case ChainId.SEPOLIA:
          return "ETH"
      }
    }
    return this.symbol;
  }
}
const ETHER = Currency.ETHER;
export { ETHER };
