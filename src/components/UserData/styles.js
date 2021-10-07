import styled from 'styled-components'
import {Form} from 'formik'

import {SubmitButtonStyles} from 'constants/globalStyles'
import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const UserDataContainer = styled.div`
  box-shadow: 0 2px 40px 0 rgb(0 0 0 / 12%);
  padding: 48px;
  border-radius: 6px;
  background-color: #fff;
  align-self: flex-start;
  max-width: 416px;
  
  ${MEDIA_QUERIES.md} {
    padding: 24px;
    max-width: 80%;
  }
  ${MEDIA_QUERIES.sm} {
    max-width: 92%;
  }
`

export const UserDataForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  margin-top: 40px;
  input {
    margin-top: 10px;
  }
`

export const SubmitButton = styled.button`
  ${SubmitButtonStyles};
  align-self: flex-start;
`
