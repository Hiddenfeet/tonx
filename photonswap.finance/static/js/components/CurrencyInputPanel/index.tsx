import { Currency, Pair } from "@photonswap/sdk";
import React, { useState, useContext, useCallback } from "react";
import styled, { ThemeContext } from "styled-components";
import { darken } from "polished";
import { useCurrencyBalance } from "../../state/wallet/hooks";
import CurrencySearchModal from "../SearchModal/CurrencySearchModal";
import CurrencyLogo from "../CurrencyLogo";
import DoubleCurrencyLogo from "../DoubleLogo";
import { RowBetween } from "../Row";
import { TYPE } from "../../theme";
import { Input as NumericalInput } from "../NumericalInput";
import { ReactComponent as DropDown } from "../../assets/images/dropdown.svg";

import { useActiveWeb3React } from "../../hooks";
import { useTranslation } from "react-i18next";
import { ButtonGray } from "../Button";

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) =>
    selected ? " 1rem 1rem 0.75rem 1rem" : "1rem 1rem 0.75rem 1rem"};
`;

const CurrencySelect = styled(ButtonGray)<{
  selected: boolean;
  hideInput?: boolean;
}>`
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  background: ${({ selected, theme }) =>
    selected ? theme.darkTransparent : `transparent`};
  color: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
  border-radius: 8px;
  box-shadow: ${({ selected }) =>
    selected ? "none" : "0px 6px 10px rgba(0, 0, 0, 0.075)"};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  outline: none;
  cursor: pointer;
  user-select: none;
  border: 1px solid
    ${({ selected, theme }) =>
      !selected ? "#24C5E0" ?? "transparent" : theme.primaryTransparent};
  height: ${({ hideInput }) => (hideInput ? "2.8rem" : "2.4rem")};
  width: ${({ hideInput }) => (hideInput ? "100%" : "initial")};
  padding: 0 8px;
  justify-content: space-between;
  margin-right: ${({ hideInput }) => (hideInput ? "0" : "12px")};
  :focus,
  :hover {
    background-color: ${({ selected, theme }) =>
      selected
        ? theme.primaryTransparent
        : darken(0.05, theme.primaryTransparent)};
  }
`;

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`;

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  margin: 0 0.25rem 0 0.35rem;
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.text1)};
    stroke-width: 1.5px;
  }
`;

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? "12px" : "12px")};
  background-color: ${({ theme, hideInput }) =>
    hideInput ? "transparent" : theme.dark5};
  z-index: 1;
  width: ${({ hideInput }) => (hideInput ? "100%" : "initial")};
  //margin-top: 5%;
`;

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: ${({ hideInput }) => (hideInput ? "12px" : "12px")};
  border: 1px solid
    ${({ theme, hideInput }) =>
      hideInput ? " transparent" : theme.primaryTransparent};
  width: ${({ hideInput }) => (hideInput ? "100%" : "initial")};
  :focus,
  :hover {
    border: 1px solid
      ${({ theme, hideInput }) =>
        hideInput ? " transparent" : theme.primary1_30};
    box-shadow: 0 0 5px rgba(39, 210, 234, 0.15),
      0 0 10px rgba(39, 210, 234, 0.3);
  }
`;

const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) =>
    active
      ? "  margin: 0 0.25rem 0 0.25rem;"
      : "  margin: 0 0.25rem 0 0.25rem;"}
  font-size:  ${({ active }) => (active ? "18px" : "18px")};
  color: ${({ theme }) => theme.text1};
`;

const StyledBalanceMax = styled.button`
  height: 28px;
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid ${({ theme }) => theme.primary5};
  border-radius: 0.5rem;
  font-size: 0.875rem;

  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.primaryText1};
  :hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`;

interface CurrencyInputPanelProps {
  value: string;
  onUserInput: (value: string) => void;
  onMax?: () => void;
  showMaxButton: boolean;
  label?: string;
  onCurrencySelect?: (currency: Currency) => void;
  currency?: Currency | null;
  disableCurrencySelect?: boolean;
  hideBalance?: boolean;
  pair?: Pair | null;
  hideInput?: boolean;
  otherCurrency?: Currency | null;
  id: string;
  showCommonBases?: boolean;
  customBalanceText?: string;
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = "Input",
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
  customBalanceText,
}: CurrencyInputPanelProps) {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const { account, chainId } = useActiveWeb3React();
  const selectedCurrencyBalance = useCurrencyBalance(
    account ?? undefined,
    currency ?? undefined
  );
  const theme = useContext(ThemeContext);

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);
  const displaySymbol = currency?.getDisplaySymbol(chainId) ?? "";
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                {label}
              </TYPE.body>
              {account && (
                <TYPE.body
                  onClick={onMax}
                  color={theme.text2}
                  fontWeight={500}
                  fontSize={14}
                  style={{ display: "inline", cursor: "pointer" }}
                >
                  {!hideBalance && !!currency && selectedCurrencyBalance
                    ? (customBalanceText ?? "Balance: ") +
                      selectedCurrencyBalance?.toSignificant(6)
                    : " -"}
                </TYPE.body>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow
          style={hideInput ? { padding: "0", borderRadius: "8px" } : {}}
          selected={disableCurrencySelect}
        >
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val);
                }}
              />
              {account && currency && showMaxButton && label !== "To" && (
                <StyledBalanceMax onClick={onMax}>MAX</StyledBalanceMax>
              )}
            </>
          )}
          <CurrencySelect
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                setModalOpen(true);
              }
            }}
          >
            <Aligner>
              {pair ? (
                <DoubleCurrencyLogo
                  currency0={pair.token0}
                  currency1={pair.token1}
                  size={24}
                  margin={true}
                />
              ) : currency ? (
                <CurrencyLogo currency={currency} size={"24px"} />
              ) : null}
              {pair ? (
                <StyledTokenName className="pair-name-container">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </StyledTokenName>
              ) : (
                <StyledTokenName
                  className="token-symbol-container"
                  active={Boolean(
                    currency && currency.getDisplaySymbol(chainId)
                  )}
                >
                  {(currency && displaySymbol && displaySymbol.length > 20
                    ? displaySymbol.slice(0, 4) +
                      "..." +
                      displaySymbol.slice(
                        displaySymbol.length - 5,
                        displaySymbol.length
                      )
                    : displaySymbol) || t("selectToken")}
                </StyledTokenName>
              )}
              {!disableCurrencySelect && (
                <StyledDropDown selected={!!currency} />
              )}
            </Aligner>
          </CurrencySelect>
        </InputRow>
      </Container>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </InputPanel>
  );
}
