import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import * as Styles from 'styles/ordersStyles'
import Seo from 'components/Seo'
import Layout from 'layout'
import BaseContainer from 'components/BaseContainer'
import Typography from 'components/Typography'
import Button from 'components/Button'
import SingleOrder from 'components/SingleOrder'
import Heading from 'components/Heading'
import {useRequest} from 'hooks/request'
import {toast} from 'react-toastify'

import EmptyOrders from '../../images/empty-orders.svg'


const OrdersPage = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const token = useSelector(state => state.token)

  const {request} = useRequest()


  const getOrders = async () => {
    let ordersResponse
    if (!token) {
      ordersResponse = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${localStorage.getItem('uuid')}`)
    } else {
      ordersResponse = await request(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/`, 'GET', null, {
        'Authorization': `Bearer ${token}`
      })
    }
    if (ordersResponse.status === 200) {
      setOrders(await ordersResponse.json())
    }
    if (ordersResponse.status === 204) {
      toast.info('У вас немає зроблених замовлень!')
      localStorage.removeItem('uuid')
    }
  }

  useEffect(() => {
    getOrders()
  }, [token])

  return (
    <>
      <Seo />
      <Layout>
        <Styles.OrderPageContainer>
          <BaseContainer>
            {orders.length > 0 ? (
              <Styles.OrdersContainer>
                <Heading>Ваша історія замовлень</Heading>
                <Styles.Orders>
                  {orders.map(order => (
                    <SingleOrder
                      key={order.id}
                      singleOrder={order}
                    />
                  ))}
                </Styles.Orders>
              </Styles.OrdersContainer>
            ) : (
              <Styles.EmptyOrdersContainer>
                <EmptyOrders />
                <Styles.EmptyInfo>
                  <Typography size={4} fontWeight={400}>Поки що ви не зробили жодного замовлення, це потрібно терміново
                    виправляти.</Typography>
                  <Typography size={5} fontWeight={500}>Переходьте на головну сторінку та змовляйте найсмачніші
                    суші!</Typography>
                  <Button onClick={() => router.push('/')}><Typography textColor={'#fff'} fontWeight={500} size={5}>На
                    головну</Typography></Button>
                </Styles.EmptyInfo>
              </Styles.EmptyOrdersContainer>
            )}
          </BaseContainer>
        </Styles.OrderPageContainer>
      </Layout>
    </>
  )
}


export default OrdersPage
