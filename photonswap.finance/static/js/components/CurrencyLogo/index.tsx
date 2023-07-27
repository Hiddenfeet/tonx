import { ChainId, Currency, ETHER, Token } from '@photonswap/sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import BinanceLogo from '../../assets/images/bnb.png'
import CronosLogo from '../../assets/images/cro.png'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import EvmOSLogo from '../../assets/images/evmos.png'
import KavaLogo from '../../assets/images/kava.png'
import HaqqLogo from '../../assets/images/haqq.png'
import MaticLogo from '../../assets/images/matic.png'
import ShardeumLogo from '../../assets/images/shardeum.png'
import RebusLogo from '../../assets/images/rebus.png'
import MintMeLogo from '../../assets/images/mintme.png'
import BitDaoLogo from '../../assets/images/bitdao.png'
import { useActiveWeb3React } from '../../hooks'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

const getTokenLogoURL = (address: string) => {
  switch (address) {
    case '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23':
      return 'https://photonswap.finance/cro.png'
    case '0xe44Fd7fCb2b1581822D0c862B68222998a0c299a':
    case '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D':
      return 'https://raw.githubusercontent.com/Prism-Network-io/default-token-list/master/logos/shared/wrappedETH.png'
    case '0x062E66477Faf219F25D27dCED647BF57C3107d52':
    case '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b':
      return 'https://raw.githubusercontent.com/Prism-Network-io/default-token-list/master/logos/shared/wrappedBTC.png'
    case '0x66e428c3f67a68878562e79A0234c1F83c208770':
    case '0x7FF4a56B32ee13D7D4D405887E0eA37d61Ed919e':
    case '0xB44a9B6905aF7c801311e8F4E76932ee959c663C':
      return 'https://raw.githubusercontent.com/Prism-Network-io/default-token-list/master/logos/shared/TETHER.png'
    case '0xF2001B145b43032AAF5Ee2884e456CCd805F677D':
    case '0x765277EebeCA2e31912C9946eAe1021199B39C61':
      return 'https://raw.githubusercontent.com/Prism-Network-io/default-token-list/master/logos/shared/DAI.png'
    case '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59':
    case '0x51e44FfaD5C2B122C8b635671FCC8139dc636E82':
    case '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f':
      return 'https://raw.githubusercontent.com/Prism-Network-io/default-token-list/master/logos/shared/USDC.png'
    case '0xe0c41FF9a7032de445771E12C14868CbE061C993':
      return 'https://photonswap.finance/dxp.png'
    case '0xbdd4e5660839a088573191A9889A262c0Efc0983':
    case '0x2fe85a78476f8B6d54aA6e1e0598Ba8b82619551':
      return 'https://photonswap.finance/photon.png'
    case '0x8F857Af6Ea31447Bb502fE0E3F4e4340CDFCfc6C':
      return 'https://pbs.twimg.com/profile_images/1437465162697646081/r_gd5J0c_400x400.jpg'
    case '0xc82eA25896F065cB6E3ae298cD1f23FE58516A35':
      return 'https://photonswap.finance/esso.png'
    case '0x34bAC19d5EAd9f92252eA81Ca9014799C32ff123':
      return 'https://photonswap.finance/photon.png'
    case '0x091267bc63B3d00ea8Db5A2831A289c5d882128c':
      return 'https://photonswap.finance/photon.png'
    case '0xc8A2413D8ac65eC936F7350d6FF62ec603004565':
      return 'https://storage.googleapis.com/us-central1-dgc-berlin-0-470cbba9-bucket/tokenlist/wevmos.png'
    case '0xD4949664cD82660AaE99bEdc034a0deA8A0bd517':
      return 'https://storage.googleapis.com/us-central1-dgc-berlin-0-470cbba9-bucket/tokenlist/wevmos.png'
    case '0x55210C2a69b4c52a9d9289A257D54d35C4a2d2eC':
      return 'https://i.ibb.co/QpdN1x9/1-A92-E710-92-AC-47-E9-979-C-007502-DA9-B87.png'
    case '0x7F7BE9FD8a2d36ebf55faC9a062AaA738C114BE6':
      return 'https://photonswap.finance/crovid.png'
    case '0x80991d751Eb39dcD86FCcd19b261c39215795094':
      return 'https://stabil.finance/logo512.png'
    case '0xbAAFeC4B6eF4F5E0bAFA850CBC48364B953EFCf9':
    case '0xc86c7C0eFbd6A49B35E8714C5f59D99De09A225b':
      return 'https://photonswap.finance/kava.png'
    case '0xd652776de7ad802be5ec7bebfafda37600222b48':
      return 'https://photonswap.finance/mintme.png'
    case '0xA41b148AeCa0823292D370f95479C10630eC95CD':
      return 'https://photonswap.finance/shardeum.png'
    case '0x30078453DEaD93bdBC31b9A18AC0a6ece171F459':
      return 'https://i.imgur.com/KTJkmWX.jpg'
    case '0xCa7350Ed65c2fC90A9DBF2D15C75E80EA91aB1c1':
      return 'https://raw.githubusercontent.com/jupiterswap/tokens/main/assets/0xa2c535EBF7A48572F61F9273E8dBF61a0A79610D/logo_24.png'
  }
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
}

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const { chainId } = useActiveWeb3React()
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []
    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    if (chainId !== undefined) {
      switch (chainId) {
        case ChainId.CRONOSTEST:
        case ChainId.CRONOSMAINNET:
          return <StyledEthereumLogo src={CronosLogo} size={size} style={style} />
        case ChainId.BSC_TEST_NET:
          return <StyledEthereumLogo src={BinanceLogo} size={size} style={style} />
        case ChainId.CASSINI:
          return <StyledEthereumLogo src={CronosLogo} size={size} style={style} />
        case ChainId.MUMBAI_TESTNET:
          return <StyledEthereumLogo src={MaticLogo} size={size} style={style} />
        case ChainId.EVMOS_TESTNET:
        case ChainId.EVMOS_MAINNET:
          return <StyledEthereumLogo src={EvmOSLogo} size={size} style={style} />
        case ChainId.KAVA_TESTNET:
        case ChainId.KAVA_MAINNET:
          return <StyledEthereumLogo src={KavaLogo} size={size} style={style} />
        case ChainId.HAQQ_TESTNET:
          return <StyledEthereumLogo src={HaqqLogo} size={size} style={style} />
        case ChainId.SHARDEUM_LIBERTY_TESTNET:
          return <StyledEthereumLogo src={ShardeumLogo} size={size} style={style} />
        case ChainId.REBUS_TESTNET:
          return <StyledEthereumLogo src={RebusLogo} size={size} style={style} />
        case ChainId.MINTME_MAINNET:
          return <StyledEthereumLogo src={MintMeLogo} size={size} style={style} />
        case ChainId.POLYGON_ZK_TESTNET:
          return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
       case ChainId.MANTLE_TESTNET:
          return <StyledEthereumLogo src={BitDaoLogo} size={size} style={style} />  
        case ChainId.PEPE_CHAIN:
          return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
        case ChainId.SEPOLIA:
          return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
      }
    }
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  }

  return (
    <StyledLogo size={size} srcs={srcs} alt={`${currency?.getDisplaySymbol(chainId) ?? 'token'} logo`} style={style} />
  )
}
