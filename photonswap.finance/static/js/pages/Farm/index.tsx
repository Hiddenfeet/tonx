import React, { useState } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { FARMING_REWARDS_INFO, useFarmingInfo } from '../../state/farm/hooks'
import { TYPE } from '../../theme'
import PoolCard, { PoolRow } from '../../components/Farm/FarmPoolCard'
import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/Farm/styled'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'
import Toggle from '../../components/Toggle'
import { FarmTable } from '../../components/Farm/FarmTable'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const PageWrapper = styled(AutoColumn)`
  max-width: 80%;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`



export default function Farm() {
  const { chainId } = useActiveWeb3React()
  const farmingInfos = useFarmingInfo()
  const [isArchived, setIsArchived] = useState(false)
  const { width } = useWindowDimensions();

  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `

  function handleArchiveTabChange() {
    setIsArchived(!isArchived);
  }

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (FARMING_REWARDS_INFO[chainId]?.length ?? 0) > 0)

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="lg">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.main fontWeight={600}>{process.env.REACT_APP_NAME} Liquidity Mining Rewards</TYPE.main>
              </RowBetween>
              <RowBetween>
                <TYPE.main fontSize={14}>
                  Deposit your LP tokens to receive rewards with swap fees, the {process.env.REACT_APP_NAME} protocol governance token.
                </TYPE.main>
              </RowBetween>{' '}
              {/* <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                href="https://blog.photonswap.finance/blog/uni/"
                target="_blank"
              >
                <TYPE.main fontSize={14}>Read more about ${WETH.symbol}</TYPE.main>
              </ExternalLink> */}
            </AutoColumn>
          </CardSection>
          <CardBGImage />
        </DataCard>
      </TopSection>

      <AutoColumn gap="lg" justify='stretch' style={{ width: '100%' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Participating pools</TYPE.mediumHeader>
          <Toggle name1={"Running Farms"} name2={"Ended Farms"} isActive={!isArchived} toggle={handleArchiveTabChange} />
        </DataRow>
        {

          (width >= 1000) ?
            <FarmTable>
              {stakingRewardsExist && farmingInfos?.length === 0 ? (
                <Loader style={{ margin: 'auto' }} />
              ) : !stakingRewardsExist ? (
                'No active rewards'
              ) : (
                isArchived
                  ? farmingInfos?.filter(stakingInfo => stakingInfo.rewardEnded === true)?.map(stakingInfo => {
                    // need to sort by added liquidity here and reward ended
                    return <PoolRow key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />
                  })
                  : farmingInfos?.filter(stakingInfo => stakingInfo.rewardEnded === false)?.map(stakingInfo => {
                    // need to sort by added liquidity here and reward is running
                    return <PoolRow key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />
                  })
              )}
            </FarmTable>

            : < PoolSection >
              {stakingRewardsExist && farmingInfos?.length === 0 ? (
                <Loader style={{ margin: 'auto' }} />
              ) : !stakingRewardsExist ? (
                'No active rewards'
              ) : (
                isArchived
                  ? farmingInfos?.filter(stakingInfo => stakingInfo.rewardEnded === true)?.map(stakingInfo => {
                    // need to sort by added liquidity here and reward ended
                    return <PoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />
                  })
                  : farmingInfos?.filter(stakingInfo => stakingInfo.rewardEnded === false)?.map(stakingInfo => {
                    // need to sort by added liquidity here and reward is running
                    return <PoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />
                  })
              )}
            </PoolSection>
        }
      </AutoColumn>
    </PageWrapper >
  )
}

