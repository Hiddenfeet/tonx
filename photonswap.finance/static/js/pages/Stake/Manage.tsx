import React, { useCallback, useState } from "react";
import { AutoColumn } from "../../components/Column";
import styled from "styled-components";

import { JSBI, TokenAmount, ETHER } from "@photonswap/sdk";
import { RouteComponentProps } from "react-router-dom";
import { useCurrency } from "../../hooks/Tokens";
import { useWalletModalToggle } from "../../state/application/hooks";
import { TYPE } from "../../theme";

import { RowBetween } from "../../components/Row";
import {
  CardSection,
  DataCard,
  CardNoise,
  CardBGImage,
} from "../../components/Stake/styled";
import { ButtonPrimary, ButtonEmpty } from "../../components/Button";
import StakingModal from "../../components/Stake/StakingModal";
import { useStakingInfo } from "../../state/stake/hooks";
import UnstakingModal from "../../components/Stake/UnstakingModal";
import ClaimRewardModal from "../../components/Stake/ClaimRewardModal";
import { useTokenBalance } from "../../state/wallet/hooks";
import { useActiveWeb3React } from "../../hooks";
import { useColor } from "../../hooks/useColor";
import { CountUp } from "use-count-up";

import { wrappedCurrency } from "../../utils/wrappedCurrency";
import { useTotalSupply } from "../../data/TotalSupply";
import { usePair } from "../../data/Reserves";
import usePrevious from "../../hooks/usePrevious";
import useUSDCPrice from "../../utils/useUSDCPrice";
import { BIG_INT_ZERO } from "../../constants";
import CurrencyLogo from "../../components/CurrencyLogo";

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`;

const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  position: relative;
  max-width: 640px;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
`;

const BottomSection = styled(AutoColumn)`
  border-radius: 12px;
  width: 100%;
  position: relative;
`;

const StyledDataCard = styled(DataCard)<{
  bgColor?: any;
  showBackground?: any;
}>`
  background: radial-gradient(
    76.02% 75.41% at 1.84% 0%,
    #1e1a31 0%,
    #3d51a5 100%
  );
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => ` ${theme.secondary1_30}`};
`;

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) => theme.bg3};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  margin-top: -26px;
  padding: 0 1.25rem 1rem 1.25rem;
  padding-top: 32px;
  z-index: 1;
`;

const PoolData = styled(DataCard)`
  background: none;
  border: 1px solid ${({ theme }) => theme.bg4};
  padding: 1rem;
  z-index: 1;
`;

const DataRow = styled(RowBetween)`
  justify-content: center;
  gap: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 12px;
  `};
`;

export default function Manage({
  match: {
    params: { id, currencyIdA, currencyIdB },
  },
}: RouteComponentProps<{
  id: string;
  currencyIdA: string;
  currencyIdB: string;
}>) {
  const { account, chainId } = useActiveWeb3React();

  // get currencies and pair
  const [currencyA, currencyB] = [
    useCurrency(currencyIdA),
    useCurrency(currencyIdB),
  ];
  const tokenA = wrappedCurrency(currencyA ?? undefined, chainId);
  const tokenB = wrappedCurrency(currencyB ?? undefined, chainId);

  const [, stakingTokenPair] = usePair(tokenA, tokenB);
  console.log(stakingTokenPair);
  console.log(id);
  const stakingInfos = useStakingInfo(
    stakingTokenPair,
    tokenA,
    id != null ? Number(id) : null
  );
  console.log("stakingInfo", stakingInfos);
  const stakingInfo = stakingInfos?.[0];
  // detect existing unstaked LP position to show add button if none found
  const userLiquidityUnstaked = useTokenBalance(
    account ?? undefined,
    stakingInfo?.stakedAmount?.token
  );
  const showAddLiquidityButton = Boolean(
    stakingInfo?.stakedAmount?.equalTo("0") &&
      userLiquidityUnstaked?.equalTo("0")
  );

  // toggle for staking modal and unstaking modal
  const [showStakingModal, setShowStakingModal] = useState(false);
  const [showUnstakingModal, setShowUnstakingModal] = useState(false);
  const [showClaimRewardModal, setShowClaimRewardModal] = useState(false);

  // fade cards if nothing staked or nothing earned yet
  const disableTop =
    !stakingInfo?.stakedAmount ||
    stakingInfo.stakedAmount.equalTo(JSBI.BigInt(0));

  const token = currencyA === ETHER ? tokenB : tokenA;
  const WETH = currencyA === ETHER ? tokenA : tokenB;
  const backgroundColor = useColor(token);

  // get WETH value of staked LP tokens
  const totalSupplyOfStakingToken = useTotalSupply(
    stakingInfo?.stakedAmount?.token
  );
  let valueOfTotalStakedAmount: TokenAmount | undefined;
  if (totalSupplyOfStakingToken && token) {
    // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
    valueOfTotalStakedAmount = new TokenAmount(
      token,
      stakingInfo.totalStakedAmount.raw
    );
  }

  const countUpAmount = stakingInfo?.earnedAmount?.toFixed(6) ?? "0";
  const countUpAmountPrevious = usePrevious(countUpAmount) ?? "0";

  // get the USD value of staked WETH
  const USDPrice = useUSDCPrice(token);
  const valueOfTotalStakedAmountInUSDC =
    valueOfTotalStakedAmount && USDPrice?.quote(valueOfTotalStakedAmount);

  const toggleWalletModal = useWalletModalToggle();

  const handleDepositClick = useCallback(() => {
    if (account) {
      setShowStakingModal(true);
    } else {
      toggleWalletModal();
    }
  }, [account, toggleWalletModal]);
  const title = `${currencyA?.getDisplaySymbol(chainId)} Staking`;
  return (
    <PageWrapper gap="lg" justify="center">
      <RowBetween style={{ gap: "24px" }}>
        <TYPE.mediumHeader style={{ margin: 0 }}>{title}</TYPE.mediumHeader>
        <CurrencyLogo currency={currencyA ?? undefined} />
      </RowBetween>

      <DataRow style={{ gap: "24px" }}>
        <PoolData>
          <AutoColumn gap="sm">
            <TYPE.body style={{ margin: 0 }}>Total deposits</TYPE.body>
            <TYPE.body fontSize={24} fontWeight={500}>
              {valueOfTotalStakedAmountInUSDC
                ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0)}`
                : `${valueOfTotalStakedAmount?.toSignificant(4, {
                    groupSeparator: ",",
                  }) ?? "-"} ${WETH?.symbol}`}
            </TYPE.body>
          </AutoColumn>
        </PoolData>
        <PoolData>
          <AutoColumn gap="sm">
            <TYPE.body style={{ margin: 0 }}>Pool Rate</TYPE.body>
            <TYPE.body fontSize={24} fontWeight={500}>
              {stakingInfo?.totalRewardRate
                ?.multiply((60 * 60 * 24 * 7).toString())
                ?.toFixed(0, { groupSeparator: "," }) ?? "-"}{" "}
              ${stakingInfo?.rewardToken?.symbol}
              {" / week"}
            </TYPE.body>
          </AutoColumn>
        </PoolData>
      </DataRow>
      {stakingInfo && (
        <>
          <StakingModal
            isOpen={showStakingModal}
            onDismiss={() => setShowStakingModal(false)}
            stakingInfo={stakingInfo}
            userLiquidityUnstaked={userLiquidityUnstaked}
          />
          <UnstakingModal
            isOpen={showUnstakingModal}
            onDismiss={() => setShowUnstakingModal(false)}
            stakingInfo={stakingInfo}
          />
          <ClaimRewardModal
            isOpen={showClaimRewardModal}
            onDismiss={() => setShowClaimRewardModal(false)}
            stakingInfo={stakingInfo}
          />
        </>
      )}

      <PositionInfo gap="lg" justify="center" dim={showAddLiquidityButton}>
        <BottomSection gap="lg" justify="center">
          <StyledDataCard
            disabled={disableTop}
            bgColor={backgroundColor}
            showBackground={!showAddLiquidityButton}
          >
            <CardSection>
              <CardBGImage desaturate />
              <CardNoise />
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.main fontWeight={600}>Your deposits</TYPE.main>
                </RowBetween>
                <RowBetween style={{ alignItems: "baseline" }}>
                  <TYPE.main fontSize={36} fontWeight={600}>
                    {stakingInfo?.stakedAmount?.toSignificant(6) ?? "-"}
                  </TYPE.main>
                  <TYPE.main>{currencyA?.getDisplaySymbol(chainId)}</TYPE.main>
                </RowBetween>
              </AutoColumn>
            </CardSection>
          </StyledDataCard>
          <StyledBottomCard
            dim={stakingInfo?.stakedAmount?.equalTo(JSBI.BigInt(0))}
          >
            <CardBGImage desaturate />
            <CardNoise />
            <AutoColumn gap="sm">
              <RowBetween>
                <div>
                  <TYPE.main>
                    Your unclaimed {stakingInfo?.rewardToken?.symbol}
                  </TYPE.main>
                </div>
                {stakingInfo?.earnedAmount &&
                  JSBI.notEqual(
                    BIG_INT_ZERO,
                    stakingInfo?.earnedAmount?.raw
                  ) && (
                    <ButtonEmpty
                      padding="8px"
                      borderRadius="8px"
                      width="fit-content"
                      onClick={() => setShowClaimRewardModal(true)}
                    >
                      Claim
                    </ButtonEmpty>
                  )}
              </RowBetween>
              <RowBetween style={{ alignItems: "baseline" }}>
                <TYPE.largeHeader fontSize={36} fontWeight={600}>
                  <CountUp
                    key={countUpAmount}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpAmountPrevious)}
                    end={parseFloat(countUpAmount)}
                    thousandsSeparator={","}
                    duration={1}
                  />
                </TYPE.largeHeader>
                <TYPE.main fontSize={16} fontWeight={500}>
                  <span
                    role="img"
                    aria-label="wizard-icon"
                    style={{ marginRight: "8px " }}
                  >
                    ⚡
                  </span>
                  {stakingInfo?.rewardRate
                    ?.multiply((60 * 60 * 24 * 7).toString())
                    ?.toSignificant(4, { groupSeparator: "," }) ?? "-"}{" "}
                  ${stakingInfo?.rewardToken?.symbol}
                  {" / week"}
                </TYPE.main>
              </RowBetween>
            </AutoColumn>
          </StyledBottomCard>
        </BottomSection>
        <TYPE.main style={{ textAlign: "center" }} fontSize={14}>
          <span
            role="img"
            aria-label="wizard-icon"
            style={{ marginRight: "8px" }}
          >
            ⭐️
          </span>
          When you withdraw, the contract will automagically claim{" "}
          {stakingInfo?.rewardToken?.symbol} on your behalf!
        </TYPE.main>

        {!showAddLiquidityButton && (
          <DataRow style={{ marginBottom: "1rem" }}>
            <ButtonPrimary
              padding="8px"
              borderRadius="8px"
              width="160px"
              onClick={handleDepositClick}
            >
              {"Deposit " + currencyA?.getDisplaySymbol(chainId)}
            </ButtonPrimary>

            {stakingInfo?.stakedAmount?.greaterThan(JSBI.BigInt(0)) && (
              <>
                <ButtonPrimary
                  padding="8px"
                  borderRadius="8px"
                  width="160px"
                  onClick={() => setShowUnstakingModal(true)}
                >
                  Withdraw
                </ButtonPrimary>
              </>
            )}
          </DataRow>
        )}
        {!userLiquidityUnstaked ? null : userLiquidityUnstaked.equalTo(
            "0"
          ) ? null : (
          <TYPE.main>
            {userLiquidityUnstaked.toSignificant(6)}{" "}
            {currencyA?.getDisplaySymbol(chainId)} tokens available
          </TYPE.main>
        )}
      </PositionInfo>
    </PageWrapper>
  );
}
