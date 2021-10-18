import {Formik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {toast} from 'react-toastify'

import * as Styles from '../styles'
import Heading from 'components/Heading'
import {CommonInput} from 'components/Inputs'
import Typography from 'components/Typography'
import {setCurrentModalAction} from 'store'

import CloseIcon from '../../../images/close.svg'
import {useRequest} from 'hooks/request'


const PassSchema = Yup.object().shape({
  password: Yup.string().min(5).max(24).required(),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null]).required()
})

const PassModal = ({closeFn, open = false, state}) => {
  const dispatch = useDispatch()
  const {request} = useRequest()
  const resetToken = useSelector(state => state.resetToken)
  const translation = useSelector(state => state.currentTranslation)

  const changePass = async (pass) => {
    const response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/user/reset/password/${resetToken}/`,
      'PUT',
      {password: pass.password}
    )
    if (response.status === 200) {
      toast.success('Ваш пароль змінено', {theme: 'colored'})
    }
    dispatch(setCurrentModalAction(''))
  }

  return (
    <Styles.ModalWindow open={open} state={state}>
      <Styles.ModalHeader>
        <Heading>{translation.modals.enterNewPass}</Heading>
        <Styles.CloseBtn onClick={closeFn}>
          <CloseIcon />
        </Styles.CloseBtn>
      </Styles.ModalHeader>

      <Styles.ModalBody>
        <Formik
          initialValues={{
            password: '',
            passwordConfirmation: ''
          }}
          validationSchema={PassSchema}
          onSubmit={values => changePass(values)}
        >
          {({values, errors, touched}) => {
            return (
              <Styles.AuthForm>
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
                <Styles.SubmitButton type="submit"
                                     active={Object.keys(errors).length === 0}>
                  {translation.modals.confirm}
                </Styles.SubmitButton>
              </Styles.AuthForm>
            )
          }}
        </Formik>
      </Styles.ModalBody>
    </Styles.ModalWindow>
  )
}

export default PassModal
