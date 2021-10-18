import styled, {css} from 'styled-components'

import Typography from 'components/Typography'
import Button from 'components/Button'
import {defaultTransition} from 'constants/globalStyles'
import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const Navigation = styled.nav`
  position: fixed;
  background-color: var(--color-white-bg);
  z-index: 10;
  width: 100vw;
  height: 80px;
  box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.2);
  
  ${MEDIA_QUERIES.md} {
    height: 60px;
  }

  > * {
    display: flex;
    align-items: center;
    height: 100%;
    column-gap: 40px;

    ${MEDIA_QUERIES.md} {
      column-gap: 14px;
    }

    ${MEDIA_QUERIES.xs} {
      column-gap: 4px;
    }
  }
`
/* constants */
const InfoHeaderBlock = css`
  height: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  column-gap: 10px;
`
const RemoveTitle = css`
  padding: 0 10px;
  span {
    display: none;
  }
`
const AdjustSVG = css`
  width: 28px;
  ${MEDIA_QUERIES.md} {
    width: 20px;
  }
`
/* */

export const Logo = styled.a`
  ${InfoHeaderBlock};
`
export const Location = styled(Logo)`
  ${MEDIA_QUERIES.lg} {
    ${RemoveTitle}
  }
  svg {
    ${AdjustSVG};
  }
`
export const PhoneNumber = styled(Location)`
  margin-left: auto;
`


/* account */
export const AccountTitle = styled.div`
  ${InfoHeaderBlock};
`
export const Account = styled.div`
  position: relative;
  cursor: pointer;
  height: 100%;
  
  > ${AccountTitle} {
    ${MEDIA_QUERIES.sm} {
      ${RemoveTitle}
    }
    svg {
      ${AdjustSVG};
    }
  }
`

export const LoginWithGoogleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`

export const GoogleButton = styled.span`
  border: 1px solid var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  padding: 10px 20px;
  transition: all 0.2s ease-in-out;
  border-radius: 30px;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--color-white-bg);
      border: 1px solid var(--color-primary);
    }
  }
  &:active {
    transform: translateY(2px);
  }
  ${MEDIA_QUERIES.sm} {
    padding: 6px 10px;
  }
`
export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`
export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;

  > * {
    :nth-child(1), :nth-child(2) {
      padding: 10px 0;
    }
  }
`

export const LoginBtn = styled(Button)`
  text-align: center;
  margin-top: 6px;
  ${MEDIA_QUERIES.sm} {
    padding: 10px 20px;
  }
`

export const LogoutBtn = styled(LoginBtn)`
  align-self: center;
`

export const RegisterBtn = styled(Typography)`
  margin-top: 12px;
  text-align: center;
  transition: all 0.15s linear;
  padding: 6px 0;

  &:hover, &:active {
    transform: translateY(2px);
    color: var(--color-text);
  }
`

export const AccountContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;
  width: 280px;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: var(--color-white-bg);
  box-shadow: 0 2px 32px 0 rgb(0 0 0 / 12%);
  padding: 26px 24px 30px;
  z-index: 1;

  ${AccountTitle} {
    height: unset;
    svg {
      width: 28px;
    }
  }

  transition: opacity 0.2s;
  ${defaultTransition};

  ${MEDIA_QUERIES.lg} {
    width: 230px;
  }
  
  ${MEDIA_QUERIES.md} {
    transform: translate(0, 0);
    
    position: fixed;
    width: 100%;
    max-height: 360px;
    top: unset;
    left: 0;
    bottom: 0;
  }
`

/* cart */
export const Cart = styled.a`
  position: relative;
  cursor: pointer;
  margin-top: -40px;
  margin-bottom: -40px;
  display: flex;
  background: #f1f1f1;
  border-radius: 20px;
  min-width: 90px;
  height: 132px;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 16px;
  box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.2);

  svg {
    max-width: 68px;
  }

  ${MEDIA_QUERIES.md} {
    min-width: 64px;
    height: 90px;

    svg {
      max-width: 52px;
    }
  }
`

export const ItemsInCart = styled.div`
  position: absolute;
  top: 38px;
  left: 22px;
  width: 36px;
  height: 28px;
  background-color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;

  ${MEDIA_QUERIES.md} {
    top: 18px;
    left: 14px;
    width: 28px;
    height: 20px;
    font-size: 14px;
  }
`
