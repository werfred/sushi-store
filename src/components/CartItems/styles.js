import styled from 'styled-components'
import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const CartItems = styled.div`
  padding-bottom: 100px;
  ${MEDIA_QUERIES.md} {
    padding-bottom: 40px;
    border-bottom: 2px solid var(--color-primary);
  }
`

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    column-gap: 12px;
    ${MEDIA_QUERIES.xs} {
      column-gap: 2px;
    }
    svg {
      width: 52px;
    }
  }
  border-bottom: 2px solid var(--color-primary);
  
`

export const EmptyCart = styled.div`
  cursor: pointer;
  transition: 0.2s;
  svg {
    max-width: 24px;
  }
  :hover {
    transform: translateY(2px);
  }
`

export const CartItemsContainer = styled.div`
  padding: 60px 0;
  > * + * {
    margin-top: 60px;
  }
`

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${MEDIA_QUERIES.sm} {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }
`
