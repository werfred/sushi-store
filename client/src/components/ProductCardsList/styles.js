import styled from 'styled-components'
import {MEDIA_QUERIES} from '../../constants/mediaQueriesList'


const ProductCardsListContainer = styled.div`
  padding-bottom: 60px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  ${MEDIA_QUERIES.xl} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${MEDIA_QUERIES.sm} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px 10px;
  }
`

export {
  ProductCardsListContainer
}
