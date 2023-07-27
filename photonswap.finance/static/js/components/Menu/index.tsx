import React, { useState } from "react";
import { isAndroid, isIOS, isMobile } from "react-device-detect";
import { NETWORK_CHAIN_ID_ENUM } from "../../connectors";
import { UNI } from "../../constants";
import { useActiveWeb3React } from "../../hooks";
import {
  StyledExternalLink,
  StyledLinkStyledButton,
  StyledMenu,
  StyledMenuContainer,
} from "../Header";
// import { ButtonPrimary } from '../Button'

// const CODE_LINK = 'https://github.com/Uniswap/uniswap-interface'

export default function Menu() {
  const { account, chainId } = useActiveWeb3React();
  const mobile = isMobile || isAndroid || isIOS;
  const [open, setOpen] = useState(false);
  // const openClaimModal = useToggleModal(ApplicationModal.ADDRESS_CLAIM)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <span
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <StyledLinkStyledButton
        id={`stake-nav-link`}
        onClick={() => {
          setOpen(!open);
        }}
        style={{
          margin: "0px",
          padding: "0px",
          marginLeft: mobile ? "4px" : "12px",
          marginRight: mobile ? "0px" : "12px",
        }}
      >
        Links
      </StyledLinkStyledButton>
      {open && (
        <StyledMenuContainer style={{ right: mobile ? "0px" : "" }}>
          <StyledMenu>
            {[
              { id: 1, link: "https://dexpad.io", name: " LaunchPad ↗" },
              { id: 2, link: "https://t.me/photonswap_fi", name: " Chat" },
              {
                id: 3,
                link: "https://t.me/photonswap_official",
                name: "Announcements",
              },
              {
                id: 4,
                link: "https://discord.gg/JVYXYr6t8q",
                name: "Discord",
              },
              {
                id: 5,
                link: "https://twitter.com/photonswap_fi",
                name: "Twitter",
              },
              {
                id: 6,
                link: "https://docs.photonswap.finance/",
                name: "Docs",
              },
              {
                id: 7,
                link: `${"/#/swap?outputCurrency=" +
                  UNI[chainId ?? NETWORK_CHAIN_ID_ENUM].address}`,
                name: `Buy ${UNI[chainId ?? NETWORK_CHAIN_ID_ENUM].symbol}`,
              },
            ]?.map((element) => (
              <>
                {(account && element["id"] === 7) || element["id"] !== 7 ? (
                  <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                    <StyledExternalLink
                      id={element["id"].toString()}
                      href={element["link"]}
                    >
                      {element["name"]}
                    </StyledExternalLink>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
          </StyledMenu>
        </StyledMenuContainer>
      )}
    </span>
  );
}
