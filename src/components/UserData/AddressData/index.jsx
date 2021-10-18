import * as Yup from 'yup'
import {Formik} from 'formik'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'

import * as Styles from '../styles'
import {CommonInput} from 'components/Inputs'
import Typography from 'components/Typography'
import {setUserDataAction} from 'store'
import {useRequest} from 'hooks/request'


const AddressSchema = Yup.object().shape({
  streetName: Yup.string().matches(/^[а-яА-Яa-zA-Z-їЇіІ ]+$/g).min(4).max(50).required(),
  houseNumber: Yup.number().min(1).max(1000).required(),
  entranceNumber: Yup.number().min(1).max(10),
  apartmentsNumber: Yup.number().min(1).max(300)
})

const AddressDataForm = () => {
  const dispatch = useDispatch()
  const {request} = useRequest()
  const userData = useSelector(state => state.userData)
  const token = useSelector(state => state.token)
  const translation = useSelector(state => state.currentTranslation)

  const updateAddress = async (values) => {
    const response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/user/`, 'PUT', {addresses: [values]}, {
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
      <Typography tag={'h4'} fontWeight={500} size={5}>{translation.userData.address}</Typography>
      <Formik
        initialValues={{
          streetName: userData.addresses[0]?.streetName || '',
          houseNumber: userData.addresses[0]?.houseNumber || '',
          entranceNumber: userData.addresses[0]?.entranceNumber || '',
          apartmentsNumber: userData.addresses[0]?.apartmentsNumber || ''
        }}
        validationSchema={AddressSchema}
        onSubmit={values => updateAddress(values)}
      >
        {({values, errors, touched}) => {
          return (
            <Styles.UserDataForm>
              <CommonInput
                label={<Typography>{translation.orderForm.streetName} <Typography textColor={'red'}>*</Typography></Typography>}
                error={`${errors.streetName && touched.streetName}`}
                name={'streetName'}
              />
              <CommonInput
                label={<Typography>{translation.orderForm.houseNumber} <Typography textColor={'red'}>*</Typography></Typography>}
                error={`${errors.houseNumber && touched.houseNumber}`}
                name={'houseNumber'}
                placeholder={'431'}
              />
              <CommonInput
                label={<Typography>{translation.orderForm.entranceNumber}</Typography>}
                error={`${errors.entranceNumber && touched.entranceNumber}`}
                name={'entranceNumber'}
                placeholder={'4'}
              />
              <CommonInput
                label={<Typography>{translation.orderForm.apartmentsNumber}</Typography>}
                error={`${errors.apartmentsNumber && touched.apartmentsNumber}`}
                name={'apartmentsNumber'}
                placeholder={'76'}
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

export default AddressDataForm
