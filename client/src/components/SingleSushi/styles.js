import styled, {css} from 'styled-components'
import Typography from '../Typography'


export const ProductContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90%;
  border: 1px solid #b6b6b6;
  border-radius: 5px;
  padding: 40px 80px;
`

export const ProductImage = styled.div`
  max-width: 420px;
  margin-right: 60px;
`

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > * {
    padding: 20px 0;
  }
`

export const ProductName = styled(Typography)``

export const ProductQuantity = styled(Typography)``

export const ProductBuy = styled.div``

export const Price = styled(Typography)`
  margin-left: 40px;
`

export const Ingredients = styled.div`
  display: flex;
  > * + * {
    margin-left: 30px;
  }
`

export const Ingredient = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80px;
  text-align: center;
  > * + * {
    margin-top: 10px;
  }
  > img {
    transition: transform 0.3s;
    :hover {
      transform: translateY(-4px) scale(1.1);
    }
  }

`

const MoveBtn = css`
  position: absolute;
  border: 1px solid #b6b6b6;
  border-radius: 5px;
  height: 85px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white-bg);
  cursor: pointer;
  transition: transform 0.4s;
`

export const PrevButton = styled.a`
  ${MoveBtn};
  left: -30px;
  :hover, :active {
    transform: translateX(-4px);
  }
`

export const NextButton = styled.a`
  ${MoveBtn};
  > svg {
    transform: rotate(180deg);
  }
  right: -30px;
  :hover, :active {
    transform: translateX(4px);
  }
`
