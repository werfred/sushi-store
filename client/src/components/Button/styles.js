import styled, {css} from 'styled-components'
import {MEDIA_QUERIES} from '../../constants/mediaQueriesList'


export const Button = styled.span`
  cursor: pointer;
  padding: 14px 24px;
  border-radius: 30px;
  display: inline-block;
  font-weight: 600;
  border: 1px solid var(--color-primary);
  background-color: var(--color-primary);
  transition: all 0.2s;
  color: #fff;
  &:active {
    transform: translateY(2px);
  }
  
  ${props => props.active ? css`
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: #f3af69;
        border: 1px solid #f3af69;
      }
    }
  ` : css`
    background-color: #fff;
    color: var(--color-text);
    border: 1px solid var(--color-primary);
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-primary);
        color: #fff;
      }
    }
  `}
  
  ${MEDIA_QUERIES.xs} {
    padding: 12px 16px;
  }
`

Button.defaultProps = {
  active: true
}

