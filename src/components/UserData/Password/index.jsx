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

  const updatePasswordData = async (values) => {
    const {passwordConfirmation, ...newValues} = values
    const response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/user/password/update`, 'PUT', newValues, {
      'Authorization': `Bearer ${token}`
    })
    if (response.status === 200) {
      toast.success('Пароль успішно змінено', {theme: 'colored'})
      logout()
    }
  }

  return (
    <Styles.UserDataContainer>
      <Typography tag={'h4'} fontWeight={500} size={5}>Зміна паролю</Typography>
      <Typography textColor={'#7c7c7c'}>
        Ви можете змінити пароль в будь-який момент.
        Для цього вам потрібно ввести старий пароль в перше поле і новий - у друге.
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
                label={<Typography>Поточний пароль <Typography textColor={'red'}>*</Typography></Typography>}
                error={`${errors.oldPassword && touched.oldPassword}`}
                name="oldPassword"
                type="password"
              />
              <CommonInput
                label={<Typography>Новий пароль <Typography textColor={'red'}>*</Typography></Typography>}
                error={`${errors.newPassword && touched.newPassword}`}
                name="newPassword"
                type="password"
              />
              <CommonInput
                label={<Typography>Повторіть новий пароль <Typography textColor={'red'}>*</Typography></Typography>}
                error={`${errors.passwordConfirmation && touched.passwordConfirmation}`}
                name="passwordConfirmation"
                type="password"
              />
              <Styles.SubmitButton type="submit"
                                   active={Object.keys(errors).length === 0}>
                Зберегти
              </Styles.SubmitButton>
            </Styles.UserDataForm>
          )
        }}
      </Formik>
    </Styles.UserDataContainer>
  )
}

export default PasswordDataForm
