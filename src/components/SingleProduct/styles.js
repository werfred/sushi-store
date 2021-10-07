import styled, {css} from 'styled-components'


import Typography from '../Typography'
import {MEDIA_QUERIES} from 'constants/mediaQueriesList'
import {ScrollBar} from 'constants/globalStyles'


export const ProductContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  border: 1px solid #b6b6b6;
  border-radius: 5px;
  padding: 40px 80px;
  margin: 0 40px;

  ${MEDIA_QUERIES.lg} {
    flex-direction: column;
    padding: 40px 40px;
  }

  ${MEDIA_QUERIES.sm} {
    padding: 10px 20px;
    margin: 0 10px;
  }
`

export const ProductImage = styled.div`
  max-width: 420px;
  margin-right: 60px;

  ${MEDIA_QUERIES.lg} {
    margin-right: 0;
    padding: 40px 0;
  }

  ${MEDIA_QUERIES.sm} {
    margin-right: 0;
    padding: 20px 0;
  }
`

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > * {
    padding: 20px 0;
  }

  ${MEDIA_QUERIES.lg} {
    margin-right: auto;
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
  gap: 10px;
  overflow: auto;
  ${ScrollBar};
`

export const Ingredient = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  max-width: 80px;
  text-align: center;
  padding: 0 4px;
  > * + * {
    margin-top: auto;
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

  ${MEDIA_QUERIES.sm} {
    height: 45px;
    width: 30px;
  }
`

export const PrevButton = styled.a`
  ${MoveBtn};
  left: -30px;

  :hover, :active {
    transform: translateX(-4px);
  }

  ${MEDIA_QUERIES.sm} {
    left: -15px;
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

  ${MEDIA_QUERIES.sm} {
    right: -15px;
  }
`
