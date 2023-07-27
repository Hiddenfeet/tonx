import { TokenAmount, JSBI, ChainId } from "@photonswap/sdk";
import React, { useState, useContext } from "react";
import { Text } from "rebass";
import { NavLink, withRouter } from "react-router-dom";
import { darken } from "polished";
import { useTranslation } from "react-i18next";
import { isMobile, isAndroid, isIOS } from "react-device-detect";
import styled, { ThemeContext } from "styled-components";

import Logo from "../../assets/images/mainlogo.png";
import LogoDark from "../../assets/images/mainlogo.png";
import { useActiveWeb3React } from "../../hooks";
import { useDarkModeManager } from "../../state/user/hooks";
import {
  useETHBalances,
  useAggregateUniBalance,
} from "../../state/wallet/hooks";
import { CardNoise } from "../Stake/styled";
import { CountUp } from "use-count-up";
import { TYPE, ExternalLink } from "../../theme";

import { YellowCard } from "../Card";
import Settings from "../Settings";

import Row, { RowFixed } from "../Row";
import Web3Status from "../Web3Status";
import ClaimModal from "../claim/ClaimModal";
import {
  useToggleSelfClaimModal,
  useShowClaimPopup,
} from "../../state/application/hooks";
import { useUserHasAvailableClaim } from "../../state/claim/hooks";
import { useUserHasSubmittedClaim } from "../../state/transactions/hooks";
import { Dots } from "../swap/styleds";
import Modal from "../Modal";
import UniBalanceContent from "./UniBalanceContent";
import usePrevious from "../../hooks/usePrevious";
import {
  CHAIN_INFO_CHARTS,
  CHAIN_NAME,
  CHAIN_SUPPORTED_BRIGES,
  CHAIN_SYMBOL,
  PHOTONSWAP_VERSION,
  UNI,
} from "../../constants";
import Column from "../Column";
import useUSDCPrice from "../../utils/useUSDCPrice";
import { NETWORK_CHAIN_ID_ENUM } from "../../connectors";
import Menu from "../Menu";

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`;

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`;

const HeaderLinks = styled(Row)`
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg2};
  `};
`;

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg2 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
  /* :hover {
    background-color: ${({ theme, active }) =>
      !active ? theme.bg2 : theme.bg4};
  } */
`;

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(
      174.47% 188.91% at 1.84% 0%,
      #ff007a 0%,
      #2172e5 100%
    ),
    #edeef2;
`;

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`;

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`;

const NetworkCard = styled(YellowCard)`
  border-radius: 12px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`;

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`;

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`;

const activeClassName = "ACTIVE";

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: 100%;
  padding: 6px;
  font-weight: 500;

  &.${activeClassName} {
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`;

export const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName,
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 0.8rem;
     margin: 0 6px;
  `};
`;

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.primary1)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : "underline")};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : "underline")};
  }

  :active {
    text-decoration: none;
  }
`;

export const StyledLinkStyledButton = styled(LinkStyledButton).attrs({
  activeClassName,
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;
  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 0.8rem;
  `};
`;

export const StyledMenuContainer = styled.div`
  padding-top: 10px;
  position: absolute;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    min-width: 8.125rem;
    bottom:60px;
  `};
`;
export const StyledMenu = styled.div`
  min-width: 10.125rem;
  width: 100%;
  background-color: ${({ theme }) => theme.bg2};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  z-index: 100;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    min-width: 8.125rem;
  `};
`;

console.log(StyledExternalLink);

function Header({ history }: { history: any }) {
  const { account, chainId } = useActiveWeb3React();
  const { t } = useTranslation();

  const mobile = isMobile || isAndroid || isIOS;

  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ""
  ];
  const [isDark] = useDarkModeManager();

  const toggleClaimModal = useToggleSelfClaimModal();

  const availableClaim: boolean = useUserHasAvailableClaim(account);

  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined);

  const aggregateBalance: TokenAmount | undefined = useAggregateUniBalance();

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false);
  const showClaimPopup = useShowClaimPopup();

  const countUpValue = aggregateBalance?.toFixed(0) ?? "0";
  const countUpValuePrevious = usePrevious(countUpValue) ?? "0";

  const theme = useContext(ThemeContext);
  const uni = chainId ? UNI[chainId] : undefined;
  const safeChainId = chainId ?? NETWORK_CHAIN_ID_ENUM;
  const mainToken = UNI[safeChainId];
  const photonPrice = useUSDCPrice(uni);
  const [tradeMenuOpen, setTradeMenuOpen] = useState(false);
  const [stakeMenuOpen, setStakeMenuOpen] = useState(false);
  const [bridgeMenuOpen, setBridgeMenuOpen] = useState(false);

  return (
    <HeaderFrame>
      <ClaimModal />
      <Modal
        isOpen={showUniBalanceModal}
        onDismiss={() => setShowUniBalanceModal(false)}
      >
        <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal>
      <HeaderRow>
        <Column>
          <Title href="." style={{}}>
            <UniIcon>
              <img
                width={"48px"}
                src={isDark ? LogoDark : Logo}
                alt="logo"
                style={{ maxWidth: "48px", maxHeight: "48px" }}
              />
            </UniIcon>
          </Title>
          <TYPE.body color={theme.text2} fontWeight={500} fontSize={12}>
            {PHOTONSWAP_VERSION}
          </TYPE.body>
        </Column>
        <HeaderLinks>
          <span
            onMouseEnter={() => {
              setTradeMenuOpen(true);
            }}
            onMouseLeave={() => {
              setTradeMenuOpen(false);
            }}
          >
            <StyledLinkStyledButton
              id={`stake-nav-link`}
              onClick={() => {
                setTradeMenuOpen(!tradeMenuOpen);
              }}
              style={{
                margin: "0px",
                padding: "0px",
                marginLeft: mobile ? "4px" : "12px",
                marginRight: mobile ? "0px" : "12px",
              }}
            >
              Trade
            </StyledLinkStyledButton>
            {tradeMenuOpen && (
              <StyledMenuContainer>
                <StyledMenu>
                  <StyledNavLink
                    onClick={() => {
                      setTradeMenuOpen(!tradeMenuOpen);
                    }}
                    id={`swap-nav-link`}
                    to={"/swap"}
                    isActive={() => history.location.pathname.includes("/swap")}
                  >
                    {t("swap")}
                  </StyledNavLink>
                  <StyledNavLink
                    onClick={() => {
                      setTradeMenuOpen(!tradeMenuOpen);
                    }}
                    id={`pool-nav-link`}
                    to={"/pool"}
                    isActive={() =>
                      history.location.pathname.includes("/pool") ||
                      history.location.pathname.includes("/add") ||
                      history.location.pathname.includes("/remove")
                    }
                  >
                    {t("pool")}
                  </StyledNavLink>
                </StyledMenu>
              </StyledMenuContainer>
            )}
          </span>
          <span
            onMouseEnter={() => {
              setStakeMenuOpen(true);
            }}
            onMouseLeave={() => {
              setStakeMenuOpen(false);
            }}
          >
            <StyledLinkStyledButton
              id={`stake-nav-link`}
              onClick={() => {
                setStakeMenuOpen(!stakeMenuOpen);
              }}
              style={{
                margin: "0px",
                padding: "0px",
                marginLeft: mobile ? "4px" : "12px",
                marginRight: mobile ? "0px" : "12px",
              }}
            >
              Stake
            </StyledLinkStyledButton>
            {stakeMenuOpen && (
              <StyledMenuContainer>
                <StyledMenu>
                  <StyledNavLink
                    onClick={() => {
                      setStakeMenuOpen(!stakeMenuOpen);
                    }}
                    id={`stake-nav-link-lp`}
                    to={"/farm"}
                    isActive={() => history.location.pathname.includes("/farm")}
                  >
                    LP Farms
                  </StyledNavLink>
                  <StyledNavLink
                    onClick={() => {
                      setStakeMenuOpen(!stakeMenuOpen);
                    }}
                    id={`stake-nav-link-stake`}
                    to={"/stake"}
                    isActive={() =>
                      history.location.pathname.includes("/stake")
                    }
                  >
                    Stake
                  </StyledNavLink>
                </StyledMenu>
              </StyledMenuContainer>
            )}
          </span>
          {CHAIN_INFO_CHARTS[chainId ?? NETWORK_CHAIN_ID_ENUM] ? (
            <StyledExternalLink
              id={`info-chart-link`}
              href={CHAIN_INFO_CHARTS[chainId ?? NETWORK_CHAIN_ID_ENUM] ?? ""}
            >
              Analytics↗
            </StyledExternalLink>
          ) : null}
          {CHAIN_SUPPORTED_BRIGES[chainId ?? NETWORK_CHAIN_ID_ENUM].length >
          0 ? (
            <>
              {" "}
              {(CHAIN_SUPPORTED_BRIGES[chainId ?? NETWORK_CHAIN_ID_ENUM]
                ?.length ?? 0) > 1 ? (
                <span
                  onMouseEnter={() => {
                    setBridgeMenuOpen(true);
                  }}
                  onMouseLeave={() => {
                    setBridgeMenuOpen(false);
                  }}
                >
                  <StyledLinkStyledButton
                    id={`stake-nav-link`}
                    onClick={() => {
                      setBridgeMenuOpen(!bridgeMenuOpen);
                    }}
                    style={{
                      margin: "0px",
                      padding: "0px",
                      marginLeft: mobile ? "4px" : "12px",
                      marginRight: mobile ? "0px" : "12px",
                    }}
                  >
                    Bridges
                  </StyledLinkStyledButton>
                  {bridgeMenuOpen && (
                    <StyledMenuContainer style={{ right: mobile ? "0px" : "" }}>
                      <StyledMenu>
                        {CHAIN_SUPPORTED_BRIGES[
                          chainId ?? NETWORK_CHAIN_ID_ENUM
                        ]?.map((element) => (
                          <div
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                            }}
                          >
                            <StyledExternalLink
                              id={element[0]}
                              href={element[1]}
                            >
                              {element[0] + " ↗"}
                            </StyledExternalLink>
                          </div>
                        ))}
                      </StyledMenu>
                    </StyledMenuContainer>
                  )}
                </span>
              ) : (
                <StyledExternalLink
                  id={
                    CHAIN_SUPPORTED_BRIGES[
                      chainId ?? NETWORK_CHAIN_ID_ENUM
                    ]?.[0]?.[0]
                  }
                  href={
                    CHAIN_SUPPORTED_BRIGES[
                      chainId ?? NETWORK_CHAIN_ID_ENUM
                    ]?.[0]?.[1] ?? ""
                  }
                >
                  Bridge↗
                </StyledExternalLink>
              )}
            </>
          ) : null}
          <Menu />
        </HeaderLinks>
      </HeaderRow>
      <HeaderControls>
        <HeaderElement>
          {chainId === ChainId.CRONOSMAINNET ? (
            <HideSmall style={{ justifyContent: "center" }}>
              <NetworkCard>
                <StyledExternalLink
                  id={`stake-nav-link`}
                  href={
                    "https://geckoterminal.com/cro/pools/0x2f47ae6d9d8e45bfb3b1358fd0f77652ad3ab18f"
                  }
                >
                  {mainToken.symbol}&nbsp;&nbsp;${photonPrice?.toFixed()}
                </StyledExternalLink>
              </NetworkCard>
            </HideSmall>
          ) : null}
          <HideSmall>
            {chainId && CHAIN_NAME[chainId] && (
              <NetworkCard title={CHAIN_NAME[chainId]}>
                {CHAIN_NAME[chainId]}
              </NetworkCard>
            )}
          </HideSmall>
          {availableClaim && !showClaimPopup && (
            <UNIWrapper onClick={toggleClaimModal}>
              <UNIAmount
                active={!!account && !availableClaim}
                style={{ pointerEvents: "auto" }}
              >
                <TYPE.white padding="0 2px">
                  {claimTxn && !claimTxn?.receipt ? (
                    <Dots>Claiming {mainToken.symbol}</Dots>
                  ) : (
                    "Claim " + mainToken.symbol
                  )}
                </TYPE.white>
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}
          {!availableClaim &&
            aggregateBalance &&
            JSBI.greaterThan(aggregateBalance.raw, JSBI.BigInt(0)) && (
              <UNIWrapper onClick={() => setShowUniBalanceModal(true)}>
                <UNIAmount
                  active={!!account && !availableClaim}
                  style={{ pointerEvents: "auto" }}
                >
                  <HideSmall>
                    <TYPE.white
                      style={{
                        paddingRight: ".4rem",
                      }}
                    >
                      <CountUp
                        key={countUpValue}
                        isCounting
                        start={parseFloat(countUpValuePrevious)}
                        end={parseFloat(countUpValue)}
                        thousandsSeparator={","}
                        duration={1}
                      />
                    </TYPE.white>
                  </HideSmall>
                  {mainToken.symbol}
                </UNIAmount>
                <CardNoise />
              </UNIWrapper>
            )}
          <AccountElement active={!!account} style={{ pointerEvents: "auto" }}>
            {account && userEthBalance ? (
              <BalanceText
                style={{ flexShrink: 0 }}
                pl="0.75rem"
                pr="0.5rem"
                fontWeight={500}
              >
                {userEthBalance?.toSignificant(4)}{" "}
                {
                  CHAIN_SYMBOL[
                    chainId === undefined ? ChainId.CRONOSMAINNET : chainId
                  ]
                }
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          <Settings />
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  );
}

export default withRouter(Header);
