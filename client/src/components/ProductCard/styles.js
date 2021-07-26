import styled from 'styled-components'
import {MEDIA_QUERIES} from '../../constants/mediaQueriesList'


export const ProductCardContainer = styled.div`
  max-width: 300px;
  width: 100%;
  padding: 34px 28px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.4s;
  border-radius: 4px;
  position: relative;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      z-index: 2;
      box-shadow: 0 2px 40px 0 rgb(0 0 0 / 12%);
    }
  }

  ${MEDIA_QUERIES.lg} {
    padding: 24px 16px;
  }

  ${MEDIA_QUERIES.sm} {
    padding: 12px 8px;
  }
`

export const ProductImage = styled.a`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  > img {
    height: 128px;
  }

  ${MEDIA_QUERIES.lg} {
    margin-bottom: 12px;

    > img {
      max-height: 106px;
    }
  }

  ${MEDIA_QUERIES.md} {
    > img {
      max-height: 74px;
    }
  }

  ${MEDIA_QUERIES.sm} {
    > img {
      max-height: 52px;
    }
  }
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > * {
    padding: 12px 0;
  }

  ${MEDIA_QUERIES.md} {
    > * {
      padding: 6px 0;
    }
  }
`

export const ProductBuy = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;

  ${MEDIA_QUERIES.md} {
    flex-direction: column;
    align-items: flex-start;

    > * {
      :nth-child(2) {
        order: -1;
        margin-bottom: 10px;
      }
    }
  }
`
