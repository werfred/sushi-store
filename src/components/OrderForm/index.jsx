import {useDispatch, useSelector} from 'react-redux'
import {Formik} from 'formik'
import {useRouter} from 'next/router'
import * as Yup from 'yup'
import {toast} from 'react-toastify'
import {v4 as uuidv4} from 'uuid'

import * as Styles from './styles'
import Typography from 'components/Typography'
import Button from 'components/Button'
import {CommonInput, PhoneInput, RadioInput} from 'components/Inputs'
import {clearProductsCartAction} from 'store'
import {phoneNumberRegex} from 'constants/regex'
import {useRequest} from 'hooks/request'


const OrderForm = () => {
  const DUMMY_STREET_NAME = 'DUMMYSTREETNAME'
  const dispatch = useDispatch()
  const {request} = useRequest()
  const router = useRouter()
  const cartPrice = useSelector(state => state.cartPrice)
  const cartProducts = useSelector(state => state.cartProducts)
  const token = useSelector(state => state.token)
  const userData = useSelector(state => state.userData)

  const sendData = async (formValues) => {
    const {streetName, houseNumber, entranceNumber, apartmentsNumber, ...otherData} = formValues
    const address = {streetName, houseNumber, entranceNumber, apartmentsNumber}
    if (streetName === DUMMY_STREET_NAME) {
      Object.keys(address).forEach((key) => {
        address[key] = ''
      })
    }

    let uniqueId = ''
    if (localStorage.getItem('uuid')) {
      uniqueId = localStorage.getItem('uuid')
    } else {
      uniqueId = uuidv4()
      localStorage.setItem('uuid', uniqueId)
    }

    const sendObject = {
      ...otherData,
      address: {...address},
      order: [...cartProducts],
      uuid: uniqueId
    }
    let response
    if (!token) {
      response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/create-by-uuid`, 'POST', sendObject)
    } else {
      response = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/create`, 'POST', sendObject, {
        'Authorization': `Bearer ${token}`
      })
    }
    if (response.status === 201) {
      toast.success('Замовлення успішно додано у чергу')
      await router.push(`/account/orders`)
      dispatch(clearProductsCartAction())
    }
  }

  const showWarning = (errors, touched) => {
    if (Object.keys(errors).length !== 0 ||
      (Object.keys(errors).length === 0 && Object.keys(touched).length === 0)
    ) {
      toast.warning('Виділені поля повинні бути заповнені!')
    }
  }

  const OrderSchema = Yup.object().shape({
    customerName: Yup.string().min(2).max(50).required(),
    email: Yup.string().email().required(),
    phoneNumber: Yup.string().matches(phoneNumberRegex).required(),
    streetName: Yup.string().matches(/^[а-яА-Яa-zA-Z-їЇіІ ]+$/g).min(4).max(50).required(),
    houseNumber: Yup.number().min(1).max(1000).required(),
    entranceNumber: Yup.number().min(1).max(10),
    apartmentsNumber: Yup.number().min(1).max(300),
    moneyChangeFrom: Yup.number().min(cartPrice).max(cartPrice + 1000)
  })

  return (
    <>
      <Formik
        initialValues={{
          customerName: userData?.name,
          email: userData?.email,
          phoneNumber: userData?.phoneNumber,
          deliveryType: 'Delivery',
          streetName: userData?.addresses[0]?.streetName,
          houseNumber: userData?.addresses[0]?.houseNumber,
          entranceNumber: userData?.addresses[0]?.entranceNumber,
          apartmentsNumber: userData?.addresses[0]?.apartmentsNumber,
          paymentMethod: 'Cash',
          moneyChangeFrom: ''
        }}
        validationSchema={OrderSchema}
        onSubmit={(values) => sendData(values)}
      >
        {({values, errors, touched}) => {
          if (values.deliveryType === 'Pickup') {
            values.streetName = DUMMY_STREET_NAME
            values.houseNumber = '70'
            values.entranceNumber = ''
            values.apartmentsNumber = ''

            const {streetName, houseNumber, entranceNumber, apartmentsNumber, ...newErrors} = errors
            errors = newErrors
          }
          if (values.deliveryType === 'Delivery' && values.streetName === DUMMY_STREET_NAME) {
            values.streetName = ''
            values.houseNumber = ''
          }

          if (values.paymentMethod === 'Card') {
            values.moneyChangeFrom = ''

            const {moneyChangeFrom, ...newErrors} = errors
            errors = newErrors
          }
          return (
            <Styles.OrderForm>
              <Styles.PersonalData>
                <Typography tag={'h3'} size={5} fontWeight={600}>Персональні дані</Typography>
                <Styles.Fields>
                  <CommonInput
                    label={<Typography>Ваше ім&apos;я <Typography textColor={'red'}>*</Typography></Typography>}
                    error={`${errors.customerName && touched.customerName}`}
                    name={'customerName'}
                    placeholder={'Іван Іванович'}
                  />
                  <CommonInput
                    label={<Typography>Email <Typography textColor={'red'}>*</Typography></Typography>}
                    error={`${errors.email && touched.email}`}
                    name={'email'}
                    placeholder={'sushi@uchia.com'}
                  />
                  <PhoneInput
                    name="phoneNumber"
                    error={`${errors.phoneNumber && touched.phoneNumber}`}
                    label={<Typography>Номер Телефону <Typography textColor={'red'}>*</Typography></Typography>}
                    placeholder={'+380 99-999-99-99'}
                  />
                </Styles.Fields>
              </Styles.PersonalData>

              <Styles.DeliveryType>
                <Typography tag={'h3'} size={5} fontWeight={600}>Тип доставки</Typography>
                <Styles.Fields>
                  <RadioInput checked={values.deliveryType === 'Delivery'} value="Delivery" name={'deliveryType'}
                              label={<Typography size={4}>Доставка до ваших дверей</Typography>} />
                  <RadioInput value="Pickup" name={'deliveryType'}
                              label={<Typography size={4}>Самовивіз за нашою адресою</Typography>} />
                </Styles.Fields>
              </Styles.DeliveryType>

              {values.deliveryType === 'Delivery' && (
                <Styles.Address>
                  <Typography tag={'h3'} size={5} fontWeight={600}>Адреса доставки</Typography>
                  <Styles.Fields>
                    <CommonInput
                      label={<Typography>Назва вулиці <Typography textColor={'red'}>*</Typography></Typography>}
                      error={`${errors.streetName && touched.streetName}`}
                      name={'streetName'}
                      placeholder={'Зигіна'}
                    />
                    <CommonInput
                      label={<Typography>Номер будинку <Typography textColor={'red'}>*</Typography></Typography>}
                      error={`${errors.houseNumber && touched.houseNumber}`}
                      name={'houseNumber'}
                      placeholder={'431'}
                    />
                    <CommonInput
                      label={<Typography>Номер під&apos;їзду</Typography>}
                      error={`${errors.entranceNumber && touched.entranceNumber}`}
                      name={'entranceNumber'}
                      placeholder={'4'}
                    />
                    <CommonInput
                      label={<Typography>Номер квартири</Typography>}
                      error={`${errors.apartmentsNumber && touched.apartmentsNumber}`}
                      name={'apartmentsNumber'}
                      placeholder={'76'}
                    />
                  </Styles.Fields>
                </Styles.Address>
              )}

              <Styles.PaymentWay>
                <Typography tag={'h3'} size={5} fontWeight={600}>Спосіб оплати</Typography>
                <Styles.Fields>
                  <RadioInput value="Cash" name={'paymentMethod'}
                              checked={values.paymentMethod === 'Cash'}
                              label={<Typography size={4}>Оплата готівкою курєру</Typography>} />
                  <RadioInput value="Card" name={'paymentMethod'}
                              label={<Typography size={4}>Оплата online</Typography>} />

                  {values.paymentMethod === 'Cash' && (
                    <CommonInput
                      label={<Typography>З яких грошей підготувати здачу</Typography>}
                      error={`${errors.moneyChangeFrom && touched.moneyChangeFrom}`}
                      name={'moneyChangeFrom'}
                      placeholder={'500'}
                    />
                  )}
                </Styles.Fields>
              </Styles.PaymentWay>
              <Styles.Buttons>
                <Button onClick={() => router.push('/')} active={false} type="submit">← Назад на головну</Button>
                <Styles.SubmitButton
                  onClick={() => showWarning(errors, touched)}
                  active={Object.keys(errors).length === 0 && Object.keys(touched).length !== 0}
                  type="submit">
                  Оформити замовлення
                </Styles.SubmitButton>
              </Styles.Buttons>
            </Styles.OrderForm>
          )
        }}
      </Formik>
    </>
  )
}

export default OrderForm
