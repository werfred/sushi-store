import * as Yup from 'yup'
import {Formik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

import * as Styles from '../styles'
import {CommonInput, PhoneInput} from 'components/Inputs'
import Typography from 'components/Typography'
import {setUserDataAction} from 'store'
import {phoneNumberRegex} from 'constants/regex'
import {useRequest} from 'hooks/request'


const PersonalDataSchema = Yup.object().shape({
  name: Yup.string().min(2).max(50).required(),
  phoneNumber: Yup.string().matches(phoneNumberRegex).required()
})

const PersonalDataForm = () => {
  const dispatch = useDispatch()
  const {request} = useRequest()
  const userData = useSelector(state => state.userData)
  const token = useSelector(state => state.token)
  const translation = useSelector(state => state.currentTranslation)

  const updatePersonalData = async (values) => {
    const response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/user/`, 'PUT', values, {
      'Authorization': `Bearer ${token}`
    })
    if (response.status === 200) {
      const data = await response.json()
      dispatch(setUserDataAction(data))
      toast.success(translation.popupMessages.dataUpdated, {theme: 'colored'})
    }
  }

  return userData && (
    <Styles.UserDataContainer>
      <Typography tag={'h4'} fontWeight={500} size={5}>{translation.userData.personalInfo}</Typography>
      <Formik
        initialValues={{
          name: userData.name,
          phoneNumber: userData.phoneNumber
        }}
        validationSchema={PersonalDataSchema}
        onSubmit={values => updatePersonalData(values)}
      >
        {({values, errors, touched}) => {
          return (
            <Styles.UserDataForm>
              <CommonInput
                label={<Typography>{translation.orderForm.name} <Typography textColor={'red'}>*</Typography></Typography>}
                error={`${errors.name && touched.name}`}
                name="name"
              />
              <PhoneInput
                name="phoneNumber"
                error={`${errors.phoneNumber && touched.phoneNumber}`}
                label={<Typography>{translation.orderForm.phoneNumber} <Typography textColor={'red'}>*</Typography></Typography>}
                placeholder={'+380 99-999-99-99'}
              />
              <Styles.SubmitButton type="submit"
                                   active={Object.keys(errors).length === 0}>
                {translation.userData.saveEntered}
              </Styles.SubmitButton>
            </Styles.UserDataForm>
          )
        }}
      </Formik>
    </Styles.UserDataContainer>
  )
}

export default PersonalDataForm
