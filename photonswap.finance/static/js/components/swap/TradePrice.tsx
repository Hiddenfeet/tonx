import React from 'react'
import { Price } from '@photonswap/sdk'
import { useContext } from 'react'
import { Repeat } from 'react-feather'
import { Text } from 'rebass'
import styled, { ThemeContext } from 'styled-components'
import { StyledBalanceMaxMini } from './styleds'
import { useActiveWeb3React } from '../../hooks'

interface TradePriceProps {
  price?: Price
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}
const StyledPriceContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 0.875rem;
  font-weight: 400;
  background-color: transparent;
  border: none;
  height: 24px;
  cursor: pointer;
`

export default function TradePrice({ price, showInverted, setShowInverted }: TradePriceProps) {
  const theme = useContext(ThemeContext)
  const { chainId } = useActiveWeb3React()

  const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6)

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const label = showInverted
    ? `${price?.quoteCurrency?.getDisplaySymbol(chainId)} per ${price?.baseCurrency?.getDisplaySymbol(chainId)}`
    : `${price?.baseCurrency?.getDisplaySymbol(chainId)} per ${price?.quoteCurrency?.getDisplaySymbol(chainId)}`

  return (
    <StyledPriceContainer >
      <div style={{ alignItems: 'center', display: 'flex', width: 'fit-content' }}>
        <Text
          fontWeight={500}
          fontSize={14}
          color={theme.text2}
          style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
        >
          {show ? (
            <>
              {formattedPrice ?? '-'} {label}
              <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
                <Repeat size={14} />
              </StyledBalanceMaxMini>
            </>
          ) : (
            '-'
          )}
        </Text>
      </div>
    </StyledPriceContainer>
  )
}
