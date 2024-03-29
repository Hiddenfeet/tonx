import { Currency, currencyEquals, JSBI, Price, WETH } from '@photonswap/sdk'
import { useMemo } from 'react'
import { NETWORK_CHAIN_ID_ENUM } from '../connectors'
import { USDC } from '../constants'
import { PairState, usePairs } from '../data/Reserves'
import { useActiveWeb3React } from '../hooks'
import { wrappedCurrency } from './wrappedCurrency'

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export default function useUSDCPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const safeChainId = chainId === undefined ? NETWORK_CHAIN_ID_ENUM : chainId
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => {
      return [
        [
          chainId && wrapped && currencyEquals(WETH[chainId], wrapped) ? undefined : currency,
           WETH[safeChainId] ,
        ],
        [wrapped?.equals(USDC[safeChainId]) ? undefined : wrapped, USDC[safeChainId]],
        [ WETH[safeChainId], USDC[safeChainId]]
      ]
    },
    [chainId, currency, wrapped]
  )
  console.log('tokenPairs',tokenPairs)
  const [[ethPairState, ethPair], [usdcPairState, usdcPair], [usdcEthPairState, usdcEthPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle weth/eth
    if (wrapped.equals(WETH[chainId])) {
      if (usdcPair) {
        const price = usdcPair.priceOf(WETH[chainId])
        return new Price(currency, USDC[chainId], price.denominator, price.numerator)
      } else {
        console.log('2')
        return undefined
      }
    }
    // handle USDC[chainId]
    if (wrapped.equals(USDC[chainId])) {
      return new Price(USDC[chainId], USDC[chainId], '1', '1')
    }

    const ethPairETHAmount = ethPair?.reserveOf(WETH[chainId])
    const ethPairETHUSDCValue: JSBI =
      ethPairETHAmount && usdcEthPair ? usdcEthPair.priceOf(WETH[chainId]).quote(ethPairETHAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the usdc pair
    if (usdcPairState === PairState.EXISTS && usdcPair && usdcPair.reserveOf(USDC[chainId]).greaterThan(ethPairETHUSDCValue)) {
      const price = usdcPair.priceOf(wrapped)
      return new Price(currency, USDC[chainId], price.denominator, price.numerator)
    }
    if (ethPairState === PairState.EXISTS && ethPair && usdcEthPairState === PairState.EXISTS && usdcEthPair) {
      if (usdcEthPair.reserveOf(USDC[chainId]).greaterThan('0') && ethPair.reserveOf(WETH[chainId]).greaterThan('0')) {
        const ethUsdcPrice = usdcEthPair.priceOf(USDC[chainId])
        const currencyEthPrice = ethPair.priceOf(WETH[chainId])
        const usdcPrice = ethUsdcPrice.multiply(currencyEthPrice).invert()
        return new Price(currency, USDC[chainId], usdcPrice.denominator, usdcPrice.numerator)
      }
    }
    console.log('3')
    return undefined
  }, [chainId, currency, ethPair, ethPairState, usdcEthPair, usdcEthPairState, usdcPair, usdcPairState, wrapped])
}
