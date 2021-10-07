import styled from 'styled-components'
import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

export const Description = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 584px;
  width: 100%;
  ${MEDIA_QUERIES.lg} {
    flex-direction: column;
    row-gap: 16px;
    align-items: flex-start;
    max-width: 240px;
  }
  ${MEDIA_QUERIES.sm} {
    max-width: 140px;
  }
  ${MEDIA_QUERIES.xs} {
    max-width: 90px;
  }
`


export const Info = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 360px;
  width: 100%;
  > * {
    :nth-child(1){
      margin-bottom: 10px;
    }
  }
  
  ${MEDIA_QUERIES.sm} {
    > div {
      display: none;
    }
  }
`

export const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 200px;
  flex-grow: 1;
  ${MEDIA_QUERIES.md} {
    max-width: 140px;
  }
  ${MEDIA_QUERIES.sm} {
    max-width: 110px;
  }
  ${MEDIA_QUERIES.xs} {
    max-width: 90px;
  }
`

export const ButtonExample = styled.span`
  border: 2px solid var(--color-primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    color: var(--color-primary);
  }
  cursor: pointer;
  user-select: none;
  ${MEDIA_QUERIES.md} {
    width: 32px;
    height: 32px;
  }
  ${MEDIA_QUERIES.xs} {
    width: 24px;
    height: 24px;
  }
`

export const RemoveAmountButton = styled(ButtonExample)``

export const AddAmountButton = styled(ButtonExample)``

export const DeleteItemButton = styled(ButtonExample)`
  border: 2px solid #999999;
  > * {
    color: #999999;
  }
  ${MEDIA_QUERIES.sm} {
    position: absolute;
    right: 0;
    top: -10px;
  }
`

export const AmountNumber = styled.div`
  padding: 4px 16px;
  max-width: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  ${MEDIA_QUERIES.sm} {
    padding: 4px 4px;
    max-width: 40px;
  }
`

export const ItemPrice = styled.div`
  max-width: 110px;
  width: 100%;
  text-align: center;
  ${MEDIA_QUERIES.sm} {
    max-width: 80px;
  }
`
