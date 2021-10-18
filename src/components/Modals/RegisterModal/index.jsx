import {Formik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {toast} from 'react-toastify'

import * as Styles from 'components/Modals/styles'
import Heading from 'components/Heading'
import Typography from 'components/Typography'
import {CommonInput, PhoneInput} from 'components/Inputs'
import {setCurrentModalAction} from 'store'
import {removeTokenFromCookie, setTokenInCookie} from 'helper/setCookie'
import {phoneNumberRegex} from 'constants/regex'
import {useRequest} from 'hooks/request'

import CloseIcon from '../../../images/close.svg'


const RegistrationSchema = Yup.object().shape({
  name: Yup.string().min(2).max(50).required(),
  email: Yup.string().email().required(),
  phoneNumber: Yup.string().matches(phoneNumberRegex).required(),
  password: Yup.string().min(5).max(24).required(),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null]).required()
})

const RegisterModal = ({closeFn, open = false, state}) => {
  const dispatch = useDispatch()
  const {request} = useRequest()
  const userData = useSelector(state => state.userData)
  const translation = useSelector(state => state.currentTranslation)

  const toAnotherModal = () => {
    dispatch(setCurrentModalAction('modal-login'))
  }

  const register = async (userData) => {
    removeTokenFromCookie()
    const {passwordConfirmation, ...sendData} = userData
    const response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register/`, 'POST', sendData)
    if (response.status === 201) {
      toast.success(translation.popupMessages.succRegistered, {theme: 'colored'})
      dispatch(setCurrentModalAction(''))
      const data = await response.json()
      setTokenInCookie(data.access)
    }
  }

  return (
    <Styles.ModalWindow open={open} state={state}>
      <Styles.ModalHeader>
        <Heading>{translation.modals.registration}</Heading>
        <Styles.CloseBtn onClick={closeFn}>
          <CloseIcon />
        </Styles.CloseBtn>
      </Styles.ModalHeader>

      <Styles.ModalBody>
        <Formik
          initialValues={{
            name: userData?.googleName,
            email: userData?.googleEmail,
            phoneNumber: '',
            password: '',
            passwordConfirmation: ''
          }}
          validationSchema={RegistrationSchema}
          onSubmit={values => register(values)}
        >
          {({values, errors, touched}) => {
            return (
              <Styles.AuthForm>
                <CommonInput
                  label={<Typography>{translation.orderForm.name} <Typography textColor={'red'}>*</Typography></Typography>}
                  error={`${errors.name && touched.name}`}
                  name="name"
                />
                <CommonInput
                  label={<Typography>Email <Typography textColor={'red'}>*</Typography></Typography>}
                  error={`${errors.email && touched.email}`}
                  name="email"
                />
                <PhoneInput
                  name="phoneNumber"
                  error={`${errors.phoneNumber && touched.phoneNumber}`}
                  label={<Typography>{translation.orderForm.phoneNumber} <Typography textColor={'red'}>*</Typography></Typography>}
                  placeholder={'+380 99-999-99-99'}
                />
                <Styles.Passwords>
                  <CommonInput
                    label={<Typography>{translation.modals.pass} <Typography textColor={'red'}>*</Typography></Typography>}
                    error={`${errors.password && touched.password}`}
                    name="password"
                    type="password"
                  />
                  <CommonInput
                    label={<Typography>{translation.modals.repeatPass} <Typography textColor={'red'}>*</Typography></Typography>}
                    error={`${errors.passwordConfirmation && touched.passwordConfirmation}`}
                    name="passwordConfirmation"
                    type="password"
                  />
                </Styles.Passwords>
                <Styles.SubmitButton type="submit"
                                     active={Object.keys(errors).length === 0}>
                  {translation.modals.register}
                </Styles.SubmitButton>
              </Styles.AuthForm>
            )
          }}
        </Formik>
      </Styles.ModalBody>

      <Styles.ModalFooter>
        <Typography fontWeight={600}>{translation.modals.alreadyHaveAccount}
          <Styles.AnotherButton onClick={toAnotherModal}> {translation.modals.logIn}</Styles.AnotherButton>
        </Typography>
      </Styles.ModalFooter>
    </Styles.ModalWindow>
  )
}

export default RegisterModal
