import styled from 'styled-components'
import {Form} from 'formik'

import {SubmitButtonStyles} from 'constants/globalStyles'
import {MEDIA_QUERIES} from 'constants/mediaQueriesList'


export const OrderForm = styled(Form)`
  padding: 20px 0;
  > * + * {
    margin-top: 80px;
  }
`

export const Fields = styled.div`
  display: flex;
  column-gap: 40px;
  justify-content: space-between;
  margin-top: 20px;
  flex-grow: 1;
`

export const PersonalData = styled.div`
  input {
    margin-top: 10px;
  }
  > * {
    ${MEDIA_QUERIES.md} {
      row-gap: 20px;
      flex-direction: column;
      max-width: 320px;
    }
  }
`

export const Address = styled.div`
  input {
    margin-top: 10px;
  }
  > * {
    ${MEDIA_QUERIES.md} {
      flex-wrap: wrap;
      gap: 20px;
      justify-content: flex-start;
      > * {
        max-width: 180px;
      }
    }
  }
`

export const DeliveryType = styled.div`
  ${Fields} {
    flex-direction: column;
    justify-content: center;

    > * + * {
      margin-top: 10px;
    }
  }
`

export const PaymentWay = styled(DeliveryType)`
  ${Fields} {
    input {
      max-width: 300px;
      margin-top: 10px;
    }
    > * {
      :nth-child(3){
        margin-top: 30px;
        display: flex;
        flex-direction: column;
      }
    }
  }
`

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`

export const SubmitButton = styled.button`
  ${SubmitButtonStyles}
`
