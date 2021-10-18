import styled from 'styled-components'

import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const Heading = styled.div`
  padding: 30px 0;

  ${MEDIA_QUERIES.sm} {
    padding: 15px 0;
  }
`
