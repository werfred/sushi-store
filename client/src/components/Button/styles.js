import styled from 'styled-components'
import {MEDIA_QUERIES} from '../../constants/mediaQueriesList'


export const Button = styled.span`
  cursor: pointer;
  padding: 14px 24px;
  border-radius: 30px;
  display: inline-block;
  font-weight: 600;
  border: 1px transparent;
  background-color: var(--color-primary);
  transition: all 0.2s;

  &:active {
    transform: translateY(2px);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #f3af69;
    }
  }
  
  ${MEDIA_QUERIES.xs} {
    padding: 12px 16px;
  }
`
