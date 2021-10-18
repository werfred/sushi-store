import {Formik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'

import * as Styles from '../styles'
import Heading from 'components/Heading'
import {CommonInput} from 'components/Inputs'
import Typography from 'components/Typography'
import {setCurrentModalAction} from 'store'
import {removeTokenFromCookie, setTokenInCookie} from 'helper/setCookie'
import {useRequest} from 'hooks/request'

import CloseIcon from '../../../images/close.svg'
import {toast} from 'react-toastify'


const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(5).max(24).required()
})

const LoginModal = ({closeFn, open = false, state}) => {
  const dispatch = useDispatch()
  const {request} = useRequest()
  const translation = useSelector(state => state.currentTranslation)

  const toAnotherModal = () => {
    dispatch(setCurrentModalAction('modal-register'))
  }

  const login = async (userData) => {
    removeTokenFromCookie()
    const response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login/`, 'POST', userData)
    if (response.status === 200) {
      dispatch(setCurrentModalAction(''))
      const data = await response.json()
      setTokenInCookie(data.access)
    }
  }

  return (
    <Styles.ModalWindow open={open} state={state}>
      <Styles.ModalHeader>
        <Heading>{translation.modals.auth}</Heading>
        <Styles.CloseBtn onClick={closeFn}>
          <CloseIcon />
        </Styles.CloseBtn>
      </Styles.ModalHeader>

      <Styles.ModalBody>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={values => login(values)}
        >
          {({values, errors, touched}) => {
            return (
              <Styles.AuthForm>
                <CommonInput
                  label={<Typography>Email <Typography textColor={'red'}>*</Typography></Typography>}
                  error={`${errors.email && touched.email}`}
                  name="email"
                />
                <CommonInput
                  label={<Typography>{translation.modals.pass} <Typography textColor={'red'}>*</Typography></Typography>}
                  error={`${errors.password && touched.password}`}
                  name="password"
                  type="password"
                />
                <Styles.SubmitButton type="submit"
                                     active={Object.keys(errors).length === 0}>
                  {translation.modals.logIn}
                </Styles.SubmitButton>
              </Styles.AuthForm>
            )
          }}
        </Formik>
      </Styles.ModalBody>

      <Styles.ModalFooter>
        <Typography fontWeight={600}>
          {translation.modals.noAccount}
          <Styles.AnotherButton onClick={toAnotherModal}> {translation.modals.register}</Styles.AnotherButton>
        </Typography>
        <Typography textColor={'red'} size={1} fontWeight={600}
                    onClick={() => dispatch(setCurrentModalAction('modal-email'))}>
          {translation.modals.forgetPass}
        </Typography>
      </Styles.ModalFooter>
    </Styles.ModalWindow>
  )
}

export default LoginModal
