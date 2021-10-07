import styled from 'styled-components'

import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const CartPageContainer = styled.div`
  padding: 40px 0;

  ${MEDIA_QUERIES.md} {
    padding: 20px 0;
  }
`

export const CartContainer = styled.div`
  max-width: 90%;
  ${MEDIA_QUERIES.xl} {
    max-width: 100%;
  }
`

export const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;

  > * {
    &:nth-child(2) {
      margin: 50px 0;
    }
  }

  ${MEDIA_QUERIES.md} {
    padding-bottom: 40px;
  }

  ${MEDIA_QUERIES.sm} {
    padding-bottom: 10px;
  }
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  > * {
    &:nth-child(1) {
      margin-top: 20px;
    }
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  column-gap: 80px;
`
