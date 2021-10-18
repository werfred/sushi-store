import {Formik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {toast} from 'react-toastify'

import * as Styles from '../styles'
import Heading from 'components/Heading'
import {CommonInput} from 'components/Inputs'
import Typography from 'components/Typography'
import {setCurrentModalAction} from 'store'
import {useRequest} from 'hooks/request'

import CloseIcon from '../../../images/close.svg'


const EmailSchema = Yup.object().shape({
  email: Yup.string().email().required()
})

const EmailModal = ({closeFn, open = false, state}) => {
  const dispatch = useDispatch()
  const {request} = useRequest()
  const translation = useSelector(state => state.currentTranslation)

  const toAnotherModal = () => {
    dispatch(setCurrentModalAction('modal-login'))
  }

  const sendMail = async (email) => {
    const response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/user/reset/send-mail/`, 'POST', email)
    if (response.status === 200) {
      dispatch(setCurrentModalAction(''))
      toast.info(translation.popupMessages.restorePasswordInstructionSent, {theme: 'colored'})
    } else if (response.status === 204) {
      toast.info(translation.popupMessages.noUserWithSuchEmail, {theme: 'colored'})
    }
  }

  return (
    <Styles.ModalWindow open={open} state={state}>
      <Styles.ModalHeader>
        <Heading>{translation.modals.yourEmail}</Heading>
        <Styles.CloseBtn onClick={closeFn}>
          <CloseIcon />
        </Styles.CloseBtn>
      </Styles.ModalHeader>

      <Styles.ModalBody>
        <Formik
          initialValues={{
            email: ''
          }}
          validationSchema={EmailSchema}
          onSubmit={values => sendMail(values)}
        >
          {({values, errors, touched}) => {
            return (
              <Styles.AuthForm>
                <CommonInput
                  label={<Typography>Email <Typography textColor={'red'}>*</Typography></Typography>}
                  error={`${errors.email && touched.email}`}
                  name="email"
                />
                <Styles.SubmitButton type="submit"
                                     active={Object.keys(errors).length === 0}>
                  {translation.modals.resetPass}
                </Styles.SubmitButton>
              </Styles.AuthForm>
            )
          }}
        </Formik>
      </Styles.ModalBody>

      <Styles.ModalFooter>
        <Styles.AnotherButton onClick={toAnotherModal}> {translation.modals.logIn}</Styles.AnotherButton>
      </Styles.ModalFooter>
    </Styles.ModalWindow>
  )
}

export default EmailModal
