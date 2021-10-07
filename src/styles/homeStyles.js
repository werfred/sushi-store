import styled from 'styled-components'
import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const FiltersArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 20px;
  gap: 20px;
  ${MEDIA_QUERIES.xl} {
    flex-direction: column;
  }
`

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  ${MEDIA_QUERIES.xl} {
    order: 1;
  }
  max-width: 860px;
  width: 100%;
`

export const ProductsNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  text-align: center;
  > * {
    padding: 20px 0;
  }
  svg {
    max-width: 580px;
  }
`

