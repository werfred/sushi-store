import styled, {css} from 'styled-components'
import {Field} from 'formik'

import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const InputStyles = css`
  width: 100%;
  background-color: #ececec;
  font-size: 18px;
  color: var(--color-text);
  padding: 16px 24px;
  border-radius: 8px;
  outline: none;
  border: 1px solid ${props => props.error === 'true' ? 'red' : '#ececec'};
  transition: all 0.2s;

  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    background-color: #e0e0e0;
    border: 1px solid ${props => props.error === 'true' ? 'red' : '#0c0c0c'};
  }

  ${MEDIA_QUERIES.lg} {
    font-size: 16px;
  }

  ${MEDIA_QUERIES.md} {
    font-size: 14px;
  }

  ${MEDIA_QUERIES.sm} {
    padding: 12px 20px;
  }
`

export const Label = styled.label``

export const Input = styled(Field)`
  ${InputStyles};
`
