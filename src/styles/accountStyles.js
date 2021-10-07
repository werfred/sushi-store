import styled from 'styled-components'

import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const AccountContainer = styled.div`
  padding-bottom: 100px;
  padding-top: 20px;

  ${MEDIA_QUERIES.lg} {
    padding-bottom: 20px;
  }
`

export const Forms = styled.div`
  display: flex;
  gap: 60px;
  padding: 40px 0;
  flex-wrap: wrap;

  ${MEDIA_QUERIES.lg} {
    justify-content: center;
  }
`
