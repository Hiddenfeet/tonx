import { Currency, Percent, Price } from '@photonswap/sdk'
import React, { useContext } from 'react'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import { AutoColumn } from '../../components/Column'
import { AutoRow } from '../../components/Row'
import { ONE_BIPS } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../theme'

export function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  const theme = useContext(ThemeContext)
  const { chainId } = useActiveWeb3React()
  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-around" gap="4px">
        <AutoColumn justify="center">
          <TYPE.main>{price?.toSignificant(6) ?? '-'}</TYPE.main>
          <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1}>
            {currencies[Field.CURRENCY_B]?.getDisplaySymbol(chainId)} per {currencies[Field.CURRENCY_A]?.getDisplaySymbol(chainId)}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <TYPE.main>{price?.invert()?.toSignificant(6) ?? '-'}</TYPE.main>
          <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1}>
            {currencies[Field.CURRENCY_A]?.getDisplaySymbol(chainId)} per {currencies[Field.CURRENCY_B]?.getDisplaySymbol(chainId)}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <TYPE.main>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </TYPE.main>
          <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1}>
            Share of Pool
          </Text>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  )
}
