import "styled-components/macro";
import React from "react";
import { Link } from "react-router-dom";
import { DefaultTheme } from "styled-components/macro";
import styled from "styled-components";
import Column, { AutoColumn } from "../Column";
import { AutoRow } from "../Row";
import DoubleCurrencyLogo from "../DoubleLogo";
import {
  Currency,
  CurrencyAmount,
  Pair,
  TokenAmount,
  ETHER,
} from "@photonswap/sdk";
import { TYPE } from "../../theme";
import { FarmCountdown } from "../../pages/Farm/FarmCountdown";
import { FarmingInfo } from "../../state/farm/hooks";
import { currencyId } from "../../utils/currencyId";

const FarmContainer = styled(Column)`
  max-width: 100%;
  width: 100%;
  background: ${({ theme }: { theme: DefaultTheme }) => theme.secondary1_30};
  //box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
  //  0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 10px;
  padding: 24px;
  //border: 1px solid blue;
  flex: 1 1;
  position: relative;

  border: 1px solid ${({ theme }) => theme.border1};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 8px;
`;

export function FarmTable({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <FarmContainer>
        {/*<div*/}
        {/*  css={`*/}
        {/*    display: grid;*/}
        {/*    gap: 8px;*/}
        {/*    grid-template-columns: repeat(4, minmax(0, 1fr));*/}
        {/*  `}*/}
        {/*>*/}
        <FarmTableHeader />
        {/*<RowBetween>*/}
        {/*  <HR />*/}
        {/*</RowBetween>*/}
        {children}
        {/*</div>*/}
      </FarmContainer>
    </>
  );
}

// const FarmTableHeaderRow = styled(RowBetween)`
//
// `

const FarmTableHeaderText = styled(AutoColumn)`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text1};
  text-align: center;
`;

const FarmTableHeaderContainer = styled(AutoRow)`
  // background: ${({ theme }: { theme: DefaultTheme }) => theme.secondary1_30};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
   0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 8px 8px 0px 0px;
  border-bottom: 1px solid ${({ theme }: { theme: DefaultTheme }) =>
    theme.border1};
  padding: 10px 25px;
  padding-left: 11%;
  padding-right: 5%;
  margin-bottom: 2%;
`;
export function FarmTableHeader() {
  return (
    <FarmTableHeaderContainer justify={"space-between"}>
      <FarmTableHeaderText>Pool</FarmTableHeaderText>
      <FarmTableHeaderText>Total deposited</FarmTableHeaderText>
      <FarmTableHeaderText>Pool rate (per Week)</FarmTableHeaderText>
      <FarmTableHeaderText>APR</FarmTableHeaderText>
      {/* <FarmTableHeaderText>Rewards Start</FarmTableHeaderText> */}
      <FarmTableHeaderText>Rewards Time</FarmTableHeaderText>
      {/* <FarmTableHeaderText>Your Deposit</FarmTableHeaderText> */}
    </FarmTableHeaderContainer>
  );
}

type TableRowProps = {
  stakingInfo: FarmingInfo;
  title: string;
  currency0: Currency;
  currency1: Currency;
  pair?: Pair | null;
  valueOfTotalStakedAmountInUSDC: CurrencyAmount | undefined;
  valueOfTotalStakedAmountInWETH: TokenAmount | undefined;
  apr: string;
};

const PoolPair = styled(AutoColumn)`
  display: flex;
  justify-content: start;
  align-items: center;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.primary1};
  width: 20%;
`;

const PoolRow = styled(Link)`
  text-decoration: none;
  border-radius: 10px;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.text1};
  font-size: 1.1rem;
  //border: 1px solid rgba(12, 92, 146, 0.2);
  //box-shadow: 0 0 5px rgba(39, 210, 234, 0.05), 0 0 7px rgba(39, 210, 234, 0.05);
  :hover,
  :focus {
    color: ${({ theme }) => theme.text2};
    border: 1px solid rgba(12, 92, 146, 0.7);
    box-shadow: 0 0 5px rgba(39, 210, 234, 0.1), 0 0 7px rgba(39, 210, 234, 0.1);
    background: linear-gradient(
      264deg,
      rgba(16, 16, 18, 0.1) 0%,
      rgba(39, 210, 234, 0.05) 25%,
      rgba(16, 16, 18, 0.1) 50%,
      rgba(39, 210, 234, 0.05) 75%,
      rgba(16, 16, 18, 0.1) 100%
    );
  }
  padding: 10px 30px;
  margin-top: 2%;
`;

const RowColumn = styled.div`
  width: 20%;
  text-align: center;
  justify-content: flex-end;
`;

export function FarmTableRow({
  stakingInfo,
  title,
  currency0,
  currency1,
  pair,
  valueOfTotalStakedAmountInUSDC,
  valueOfTotalStakedAmountInWETH,
  apr,
}: TableRowProps) {
  const token0 = stakingInfo.tokens[0];
  const token1 = stakingInfo.tokens[1];
  const WETH = currency0 === ETHER ? token0 : token1;
  return (
    <PoolRow
      to={`/farm/${stakingInfo.farmId}/${currencyId(currency0)}/${currencyId(
        currency1
      )}`}
    >
      <AutoRow gap="0%" justify={"space-between"}>
        <PoolPair>
          <DoubleCurrencyLogo
            currency0={currency0 ?? pair?.token1}
            currency1={currency1 ?? pair?.token0}
            size={32}
          />

          <TYPE.main
            fontWeight={600}
            fontSize={20}
            style={{ marginLeft: "8px" }}
          >
            {title ?? `${pair?.token0.symbol + "/" + pair?.token1.symbol}`}
          </TYPE.main>

          {/* <DoubleCurrencyLogo currency0={pair?.token1} currency1={pair?.token0} size={36} /> */}
        </PoolPair>
        <RowColumn>
          <TYPE.main>
            {valueOfTotalStakedAmountInUSDC
              ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0, {
                  groupSeparator: ",",
                })}`
              : `${valueOfTotalStakedAmountInWETH?.toSignificant(4, {
                  groupSeparator: ",",
                }) ?? "-"} ${WETH.symbol}`}
          </TYPE.main>
        </RowColumn>
        <RowColumn>
          <TYPE.main>{`${stakingInfo.totalRewardRate
            ?.multiply(`${60 * 60 * 24 * 7}`)
            ?.toFixed(0, { groupSeparator: "," })} ${
            stakingInfo.rewardToken.symbol
          } / week`}</TYPE.main>
        </RowColumn>
        <RowColumn>
          {" "}
          <TYPE.main>{apr}</TYPE.main>
        </RowColumn>
        {/* <RowColumn>
          <TYPE.main>{stakingInfo.extraMessage}</TYPE.main>
        </RowColumn> */}
        <RowColumn>
          {stakingInfo.periodFinish !== undefined ? (
            <FarmCountdown exactEnd={stakingInfo.periodFinish} />
          ) : null}
        </RowColumn>
      </AutoRow>
      {/* <HRDark /> */}
    </PoolRow>
  );
}
