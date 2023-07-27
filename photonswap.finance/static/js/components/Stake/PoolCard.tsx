import React from "react";
import { AutoColumn } from "../Column";
import { RowBetween } from "../Row";
import styled from "styled-components";
import { TYPE, StyledInternalLink } from "../../theme";
import { ETHER, TokenAmount } from "@photonswap/sdk";
import { ButtonPrimary } from "../Button";
import { StakingInfo } from "../../state/stake/hooks";
import { useColor } from "../../hooks/useColor";
import { currencyId } from "../../utils/currencyId";
import { Break, CardBGImage } from "./styled";
import { unwrappedToken } from "../../utils/wrappedCurrency";
import { useTotalSupply } from "../../data/TotalSupply";
import { usePair } from "../../data/Reserves";
import useUSDCPrice from "../../utils/useUSDCPrice";
import { useActiveWeb3React } from "../../hooks";
import CurrencyLogo from "../CurrencyLogo";
import { Countdown } from "../../pages/Stake/Countdown";
import { StakeTableRow } from "./StakeTable";

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
`;

const Wrapper = styled(AutoColumn)<{ showBackground: boolean; bgColor: any }>`
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.border1};
  width: 100%;
  overflow: hidden;
  position: relative;
  opacity: ${({ showBackground }) => (showBackground ? "1" : "1")};
  background: ${({ theme, bgColor, showBackground }) =>
    ` ${theme.secondary1_30} `};
  color: ${({ theme, showBackground }) =>
    showBackground ? theme.white : theme.text1} !important;

  ${({ showBackground }) =>
    showBackground &&
    `  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);`}
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr 120px;
  grid-gap: 0px;
  align-items: center;
  padding: 1rem;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 48px 1fr 96px;
  `};
`;

// const APR = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `

const BottomSection = styled.div<{ showBackground: boolean }>`
  padding: 12px 16px;
  opacity: ${({ showBackground }) => (showBackground ? "1" : "0.4")};
  border-radius: 0 0 12px 12px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  z-index: 1;
`;

export default function PoolCard({
  stakingInfo,
}: {
  stakingInfo: StakingInfo;
}) {
  const token0 = stakingInfo.tokens[0];
  const token1 = stakingInfo.tokens[1];
  const { chainId } = useActiveWeb3React();
  const currency0 = unwrappedToken(token0);
  const currency1 = unwrappedToken(token1);

  const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan("0"));

  // get the color of the token
  const token = currency0 === ETHER ? token1 : token0;
  const WETH = currency0 === ETHER ? token0 : token1;
  const backgroundColor = useColor(token);

  const totalSupplyOfStakingToken = useTotalSupply(
    stakingInfo.stakedAmount.token
  );
  const rewardToken = stakingInfo.rewardToken;
  const rewardTokenPriceUnParsed = useUSDCPrice(rewardToken);
  const strRewardTokenPrice = rewardTokenPriceUnParsed
    ? `${rewardTokenPriceUnParsed.toFixed(12)}`
    : `1`;
  const rewardTokenPrice = parseFloat(strRewardTokenPrice);
  console.log("RewardToken Price", rewardTokenPrice);
  // let returnOverMonth: Percent = new Percent('0')
  let valueOfTotalStakedAmount: TokenAmount | undefined;
  if (totalSupplyOfStakingToken) {
    // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
    valueOfTotalStakedAmount = new TokenAmount(
      token,
      stakingInfo.totalStakedAmount.raw
    );
  }

  // get the USD value of staked WETH
  const USDPrice = useUSDCPrice(token);
  const valueOfTotalStakedAmountInUSDC =
    valueOfTotalStakedAmount && USDPrice?.quote(valueOfTotalStakedAmount);

  const totalDeposit = valueOfTotalStakedAmountInUSDC
    ? `${valueOfTotalStakedAmountInUSDC.toFixed()}`
    : `1`;
  let apr = "-";
  if (totalDeposit !== `1`) {
    const numApr =
      ((parseFloat(stakingInfo.totalRewardRate.toFixed()) *
        60 *
        60 *
        24 *
        365 *
        rewardTokenPrice) /
        parseFloat(totalDeposit)) *
      100;
    const aprValue = Math.round(numApr).toString();
    if (aprValue !== "NaN") {
      apr = `🔥 ${aprValue}%`;
    }
  }
  console.log(
    "valueOfTotalStakedAmountInUSDC1",
    token.symbol,
    valueOfTotalStakedAmount?.toFixed(),
    valueOfTotalStakedAmountInUSDC?.toFixed()
  );

  const title = currency0.getDisplaySymbol(chainId);
  return (
    <Wrapper showBackground={isStaking} bgColor={backgroundColor}>
      <CardBGImage desaturate />
      <TopSection>
        <CurrencyLogo currency={currency0 ?? undefined} />
        <TYPE.main fontWeight={600} fontSize={24} style={{ marginLeft: "8px" }}>
          {title}
        </TYPE.main>
        <StyledInternalLink
          to={`/stake/${stakingInfo.stakeId}/${currencyId(
            currency0
          )}/${currencyId(currency1)}`}
          style={{ width: "100%" }}
        >
          <ButtonPrimary padding="8px" borderRadius="8px">
            {isStaking ? "Manage" : "Deposit"}
          </ButtonPrimary>
        </StyledInternalLink>
      </TopSection>

      <StatContainer>
        <RowBetween>
          <TYPE.main> Total deposited</TYPE.main>
          <TYPE.main>
            {valueOfTotalStakedAmountInUSDC
              ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0)}`
              : `${valueOfTotalStakedAmount?.toSignificant(4, {
                  groupSeparator: ",",
                }) ?? "-"} ${WETH.symbol}`}
          </TYPE.main>
        </RowBetween>
        <RowBetween>
          <TYPE.main> Pool rate </TYPE.main>
          <TYPE.main>{`${stakingInfo.totalRewardRate
            ?.multiply(`${60 * 60 * 24 * 7}`)
            ?.toFixed(0, { groupSeparator: "," })} ${
            stakingInfo.rewardToken.symbol
          } / week`}</TYPE.main>
        </RowBetween>
        <RowBetween>
          <TYPE.main> APR </TYPE.main>
          <TYPE.main>{apr}</TYPE.main>
        </RowBetween>
        <RowBetween>
          <TYPE.main>{stakingInfo.extraMessage}</TYPE.main>
          {stakingInfo.periodFinish !== undefined ? (
            <Countdown exactEnd={stakingInfo.periodFinish} />
          ) : null}
        </RowBetween>
      </StatContainer>

      {isStaking && (
        <>
          <Break />
          <BottomSection showBackground={true}>
            <TYPE.main color={"white"} fontWeight={500}>
              <span>Your rate</span>
            </TYPE.main>

            <TYPE.main
              style={{ textAlign: "right" }}
              color={"white"}
              fontWeight={500}
            >
              <span
                role="img"
                aria-label="wizard-icon"
                style={{ marginRight: "0.5rem" }}
              >
                ⚡
              </span>
              {`${stakingInfo.rewardRate
                ?.multiply(`${60 * 60 * 24 * 7}`)
                ?.toSignificant(4, { groupSeparator: "," })} ${
                stakingInfo.rewardToken.symbol
              } / week`}
            </TYPE.main>
          </BottomSection>
        </>
      )}
    </Wrapper>
  );
}

export function PoolRow({ stakingInfo }: { stakingInfo: StakingInfo }) {
  const token0 = stakingInfo.tokens[0];
  const token1 = stakingInfo.tokens[1];
  const { chainId } = useActiveWeb3React();
  const currency0 = unwrappedToken(token0);
  const currency1 = unwrappedToken(token1);

  // const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0'))

  // get the color of the token
  const token = currency0 === ETHER ? token1 : token0;
  // const backgroundColor = useColor(token)

  const totalSupplyOfStakingToken = useTotalSupply(
    stakingInfo.stakedAmount.token
  );
  const [, stakingTokenPair] = usePair(...stakingInfo.tokens);
  const rewardToken = stakingInfo.rewardToken;
  const rewardTokenPriceUnParsed = useUSDCPrice(rewardToken);
  const strRewardTokenPrice = rewardTokenPriceUnParsed
    ? `${rewardTokenPriceUnParsed.toFixed(12)}`
    : `1`;
  const rewardTokenPrice = parseFloat(strRewardTokenPrice);
  console.log("RewardToken Price", rewardTokenPrice);
  // let returnOverMonth: Percent = new Percent('0')
  let valueOfTotalStakedAmount: TokenAmount | undefined;
  if (totalSupplyOfStakingToken) {
    // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
    valueOfTotalStakedAmount = new TokenAmount(
      token,
      stakingInfo.totalStakedAmount.raw
    );
  }

  // get the USD value of staked WETH
  const USDPrice = useUSDCPrice(token);
  const valueOfTotalStakedAmountInUSDC =
    valueOfTotalStakedAmount && USDPrice?.quote(valueOfTotalStakedAmount);

  const totalDeposit = valueOfTotalStakedAmountInUSDC
    ? `${valueOfTotalStakedAmountInUSDC.toFixed()}`
    : `1`;
  let apr = "-";
  if (totalDeposit !== `1`) {
    const numApr =
      ((parseFloat(stakingInfo.totalRewardRate.toFixed()) *
        60 *
        60 *
        24 *
        365 *
        rewardTokenPrice) /
        parseFloat(totalDeposit)) *
      100;
    const aprValue = Math.round(numApr).toString();
    if (aprValue !== "NaN") {
      apr = `🔥 ${aprValue}%`;
    }
  }
  console.log(
    "valueOfTotalStakedAmountInUSDC2",
    token.symbol,
    valueOfTotalStakedAmount?.toFixed(),
    valueOfTotalStakedAmountInUSDC?.toFixed()
  );

  const title = currency0.getDisplaySymbol(chainId);
  return (
    <>
      <StakeTableRow
        stakingInfo={stakingInfo}
        title={title ?? ""}
        currency0={currency0}
        currency1={currency1}
        pair={stakingTokenPair}
        valueOfTotalStakedAmountInUSDC={valueOfTotalStakedAmountInUSDC}
        valueOfTotalStakedAmountInWETH={valueOfTotalStakedAmount}
        apr={apr}
      />
    </>
  );
}
