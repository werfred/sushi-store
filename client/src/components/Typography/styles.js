import styled from 'styled-components'

import {SIZES} from './constants'
import {MEDIA_QUERIES} from '../../constants/mediaQueriesList'


const Typography = styled.div`
  color: ${props => props.textColor};
  line-height: ${props => props.lineHeight};
  font-weight: ${props => props.fontWeight};
  font-size: ${props => SIZES[props.size].default};
  font-family: ${props => props.fontFamily ? props.fontFamily : null};
  
  ${props => {
    return `${MEDIA_QUERIES.xl}{
      font-size: ${SIZES[props.size].md}
    }`
  }}
  ${props => {
    return `${MEDIA_QUERIES.sm}{
      font-size: ${SIZES[props.size].sm}
    }`
  }}
`

Typography.defaultProps = {
  textColor: 'var(--color-text)',
  size: '3',
  lineHeight: '1.2',
  fontWeight: '400',
}

export {Typography}
