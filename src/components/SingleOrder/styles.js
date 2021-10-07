import styled, {css} from 'styled-components'

import {MEDIA_QUERIES} from 'constants/mediaQueriesList'
import {ScrollBar} from 'constants/globalStyles'


export const SingleOrderContainer = styled.div`
  border: 1px solid #b6b6b6;
  transition: all 0.4s ease-in-out;
  ${props => (
          props.open ? css`
            max-height: calc(176px + ${props.orderItems} * 108px);
            border: 1px solid var(--color-primary);
          ` : css`
            max-height: 136px;

            ${MEDIA_QUERIES.md} {
              max-height: 78px;
            }
          `
  )}
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    border: 1px solid var(--color-primary);
  }
`

/* box top styles */
export const BoxTop = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px;

  svg {
    transition: 0.2s ease-in-out;
    transform: rotate${props => props.open ? '(90deg)' : '(270deg)'};
  }

  ${MEDIA_QUERIES.md} {
    padding: 10px 15px;
  }
`

export const OrderMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-left: 30px;
  min-width: 78px;

  ${MEDIA_QUERIES.md} {
    margin-left: 16px;
    row-gap: 6px;
  }
`

export const OrderProductImages = styled.div`
  display: flex;
  column-gap: 24px;
  overflow: auto;
  padding: 5px;

  img {
    max-height: 48px;
  }

  ${ScrollBar};

  margin-left: 60px;
  ${MEDIA_QUERIES.lg} {
    max-width: 400px;
  }

  ${MEDIA_QUERIES.md} {
    display: none;
  }
`

export const ProductsAmount = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  align-items: flex-end;
  max-width: 100px;
  width: 100%;
  margin-left: auto;
`

export const ProductsPrice = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  align-items: flex-end;
  margin-left: 60px;
  max-width: 120px;
  width: 100%;

  ${MEDIA_QUERIES.lg} {
    margin-left: 15px;
  }

  ${MEDIA_QUERIES.md} {
    margin-left: 10px;
  }
`


/* box bottom styles */
export const BoxBottom = styled.div`
  padding: 20px 30px 20px 76px;
  transition: 0.4s ease-in-out;

  > * + * {
    border-top: 1px solid #ccc;
  }

  ${MEDIA_QUERIES.md} {
    padding-left: 44px;
    padding-right: 15px;
  }
  ${MEDIA_QUERIES.md} {
    padding-left: 36px;
  }
`

export const SingleProduct = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  max-height: 108px;
  overflow: hidden;

  ${MEDIA_QUERIES.md} {
    > * {
      :nth-child(2) {
        display: none;
      }
    }
  }
  ${MEDIA_QUERIES.sm} {
    ${ProductsAmount} {
      display: none;
    }
  }
`

export const ProductDescription = styled.div`
  display: flex;
  align-items: center;
  max-width: 432px;
  width: 100%;

  img {
    max-height: 48px;
  }
`

export const ProductImage = styled.div`
  min-width: 92px;
  ${MEDIA_QUERIES.xs} {
    display: none;
  }
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 60px;

  > * {
    :nth-child(1) {
      margin-bottom: 10px;
    }
  }

  > div {
    > * {
      :nth-child(2) {
        ${MEDIA_QUERIES.lg} {
          display: none;
        }
      }
    }
  }

  ${MEDIA_QUERIES.lg} {
    margin-left: 20px;
  }
  ${MEDIA_QUERIES.xs} {
    margin-left: 0;
  }
`

