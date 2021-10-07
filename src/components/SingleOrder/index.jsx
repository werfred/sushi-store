import {useState} from 'react'
import * as Styles from './styles'

import SingleArrow from '../../images/single-arrow.svg'
import Typography from 'components/Typography'


const SingleOrder = ({singleOrder}) => {
  const [open, setOpen] = useState(false)

  return (
    <Styles.SingleOrderContainer orderItems={singleOrder.amount} open={open}>
      <Styles.BoxTop open={open} onClick={() => setOpen(!open)}>
        <SingleArrow open={open} />

        <Styles.OrderMainInfo>
          <Typography fontWeight={600} size={5}>#{singleOrder.id}</Typography>
          <Typography size={2}>{singleOrder.dateOfOrder.slice(0, 10)}</Typography>
          <Typography size={2}>{singleOrder.status}</Typography>
        </Styles.OrderMainInfo>

        <Styles.OrderProductImages>
          {singleOrder.order.map(item => (
            <img key={item.id} src={`${item.image}`} alt={'product image'} />
          ))}
        </Styles.OrderProductImages>

        <Styles.ProductsAmount>
          <Typography>Кількість</Typography>
          <Typography fontWeight={500} size={5}>{singleOrder.amount}</Typography>
        </Styles.ProductsAmount>

        <Styles.ProductsPrice>
          <Typography>Разом</Typography>
          <Typography fontWeight={500} size={5}>{singleOrder.price} <Typography>грн</Typography></Typography>
        </Styles.ProductsPrice>
      </Styles.BoxTop>
      <Styles.BoxBottom open={open}>
        {singleOrder.order.map(item => {
          let description = item.description
          if (item.description.length > 50) {
            description = `${item.description.slice(0, 50)}...`
          }
          return (
            <Styles.SingleProduct key={item.id}>
              <Styles.ProductDescription>
                <Styles.ProductImage>
                  <img key={item.id} src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`} alt={'product image'} />
                </Styles.ProductImage>

                <Styles.ProductInfo>
                  <Typography fontWeight={500}>{item.name}</Typography>
                  <div>
                    <Typography textColor={'#F3A229'} fontWeight={400}>{item.quantity} г</Typography>
                    <Typography lineHeight={1.5}> - {description}</Typography>
                  </div>
                </Styles.ProductInfo>
              </Styles.ProductDescription>

              <Styles.ProductsPrice>
                <Typography>Ціна</Typography>
                <Typography fontWeight={500} size={4}>{item.price} <Typography>грн</Typography></Typography>
              </Styles.ProductsPrice>

              <Styles.ProductsAmount>
                <Typography>Кількість</Typography>
                <Typography fontWeight={500} size={4}>{item.amount}</Typography>
              </Styles.ProductsAmount>

              <Styles.ProductsPrice>
                <Typography>Ціна</Typography>
                <Typography fontWeight={500} size={4}>{item.price * item.amount}
                  <Typography>грн</Typography></Typography>
              </Styles.ProductsPrice>
            </Styles.SingleProduct>
          )
        })}
      </Styles.BoxBottom>
    </Styles.SingleOrderContainer>
  )
}

export default SingleOrder
