import styled from 'styled-components'
import Typography from '../Typography'


export const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 90%;
  border: 1px solid #b6b6b6;
  border-radius: 5px;
  padding: 40px 60px;
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
    padding: 14px 0;
  }
`

export const ProductName = styled(Typography)`
`

export const ProductQuantity = styled(Typography)`
  
`

export const ProductBuy = styled.div`

`

export const Price = styled(Typography)`
  margin-left: 40px;
`
