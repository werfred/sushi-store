import * as Yup from 'yup'
import {Formik} from 'formik'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'

import * as Styles from '../styles'
import {CommonInput} from 'components/Inputs'
import Typography from 'components/Typography'
import {logout} from 'helper/logout'
import {useRequest} from 'hooks/request'


const PasswordDataSchema = Yup.object().shape({
  oldPassword: Yup.string().min(5).max(24).required(),
  newPassword: Yup.string().notOneOf([Yup.ref('oldPassword'), null]).required(),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('newPassword'), null]).required()
})

const PasswordDataForm = () => {
  const {request} = useRequest()
  const token = useSelector(state => state.token)
  const translation = useSelector(state => state.currentTranslation)

  const updatePasswordData = async (values) => {
    const {passwordConfirmation, ...newValues} = values
    const response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/user/password/update`, 'PUT', newValues, {
      'Authorization': `Bearer ${token}`
    })
    if (response.status === 200) {
      toast.success(translation.popupMessages.passChanged, {theme: 'colored'})
      logout()
    }
  }

  return (
    <Styles.UserDataContainer>
      <Typography tag={'h4'} fontWeight={500} size={5}>{translation.userData.passwordChange}</Typography>
      <Typography textColor={'#7c7c7c'}>
        {translation.userData.youCanChangePass}
      </Typography>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          passwordConfirmation: ''
        }}
        validationSchema={PasswordDataSchema}
        onSubmit={values => updatePasswordData(values)}
      >
        {({values, errors, touched}) => {
          return (
            <Styles.UserDataForm>
              <CommonInput
                label={<Typography>{translation.userData.currentPass} <Typography textColor={'red'}>*</Typography></Typography>}
                error={`${errors.oldPassword && touched.oldPassword}`}
                name="oldPassword"
                type="password"
              />
              <CommonInput
                label={<Typography>{translation.userData.newPass} <Typography textColor={'red'}>*</Typography></Typography>}
                error={`${errors.newPassword && touched.newPassword}`}
                name="newPassword"
                type="password"
              />
              <CommonInput
                label={<Typography>{translation.userData.repeatNewPass} <Typography textColor={'red'}>*</Typography></Typography>}
                error={`${errors.passwordConfirmation && touched.passwordConfirmation}`}
                name="passwordConfirmation"
                type="password"
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

export default PasswordDataForm
