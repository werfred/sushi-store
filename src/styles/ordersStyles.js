import styled from 'styled-components'


export const OrderPageContainer = styled.div`
  
`

export const EmptyOrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 40px;
  padding-bottom: 100px;
  > svg {
    max-width: 600px;
  }
`

export const EmptyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  > * {
    &:nth-child(2) {
      margin-top: 10px;
    }
    &:nth-child(3) {
      margin-top: 20px;
    }
  }
`

export const OrdersContainer = styled.div`
  padding-bottom: 100px;
`

export const Orders = styled.div`
  > * + * {
    margin-top: 30px;
  }
`
