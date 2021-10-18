import styled, {css} from 'styled-components'
import {Form} from 'formik'

import {defaultTransition, SubmitButtonStyles} from 'constants/globalStyles'
import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const ModalMask = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9998;
  transition: 0.3s ease-in-out;
  ${props => props.open ? css`
    pointer-events: all;
    opacity: 1;
  ` : css`
    pointer-events: none;
    opacity: 0;
  `}
`

export const ModalWindow = styled.div`
  background-color: var(--color-white-bg);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
  width: 100%;
  max-width: 520px;
  padding: 36px;
  border-radius: 6px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: opacity 0.3s;
  ${defaultTransition};
  
  ${MEDIA_QUERIES.md} {
    padding: 24px;
  }
  ${MEDIA_QUERIES.sm} {
    max-width: 360px;
  }
  ${MEDIA_QUERIES.xs} {
    padding: 12px;
    max-width: 300px;
  }
`

export const ModalHeader = styled.div``

export const ModalBody = styled.div``

export const CloseBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
  cursor: pointer;

  svg {
    width: 40px;
  }
`

export const AuthForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  input {
    margin-top: 10px;
  }

  ${MEDIA_QUERIES.md} {
    row-gap: 14px;
  }
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  text-align: center;
  flex-direction: column;
  gap: 10px;
  > * {
    :nth-child(2) {
      cursor: pointer;
    }
  }
`

export const AnotherButton = styled.span`
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
  padding: 10px 0;
`

export const SubmitButton = styled.button`
  ${SubmitButtonStyles};
  align-self: center;
  font-size: 18px;
`

export const Passwords = styled.div`
  display: flex;
  column-gap: 40px;

  > * {
    flex-basis: 100%;
  }

  justify-content: space-between;

  ${MEDIA_QUERIES.md} {
    column-gap: 12px;
  }
`
