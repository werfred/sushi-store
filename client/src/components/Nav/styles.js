import styled, {css} from 'styled-components'


export const Navigation = styled.nav`
  padding: 16px 0;
  > * {
    display: flex;
    align-items: center;
  }
`

const InfoHeaderBlock = css`
  > span {
    margin-left: 10px;
  }
  max-width: 300px;
  display: flex;
  align-items: center;
`

export const PhoneNumber = styled.a`
  ${InfoHeaderBlock};
  margin-left: auto;
`

export const Location = styled.a`
  ${InfoHeaderBlock};
  margin-left: 40px;
`

export const Cart = styled.a`
  position: relative;
  cursor: pointer;
  margin-right: 0;
  margin-left: 40px;
  
  display: flex;
  background: #F9F9F9;
  border-radius: 20px;
  width: 90px;
  height: 132px;
  margin-top: -40px;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 16px;
`

export const ItemsInCart = styled.div`
  position: absolute;
  top: 48px;
  left: 24px;
  width: 30px;
  height: 20px;
  background-color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`
