import {useState} from 'react'
import {useSelector} from 'react-redux'
import {useRouter} from 'next/router'

import * as Styles from './styles'
import Typography from 'components/Typography'

import SingleArrow from '../../images/single-arrow.svg'


const SingleOrder = ({singleOrder}) => {
  const router = useRouter()
  const translation = useSelector(state => state.currentTranslation)
  const [open, setOpen] = useState(false)

  return (
    <Styles.SingleOrderContainer orderItems={singleOrder.amount} open={open}>
      <Styles.BoxTop open={open} onClick={() => setOpen(!open)}>
        <SingleArrow open={open} />

        <Styles.OrderMainInfo>
          <Typography fontWeight={600} size={5}>#{singleOrder.id}</Typography>
          <Typography size={2}>{singleOrder.dateOfOrder.slice(0, 10)}</Typography>
          <Typography size={2}>{singleOrder.status[router.locale]}</Typography>
        </Styles.OrderMainInfo>

        <Styles.OrderProductImages>
          {singleOrder.order.map(item => (
            <img key={item.id} src={`${item.image}`} alt={'product image'} />
          ))}
        </Styles.OrderProductImages>

        <Styles.ProductsAmount>
          <Typography>{translation.sushi.amountFull}</Typography>
          <Typography fontWeight={500} size={5}>{singleOrder.amount}</Typography>
        </Styles.ProductsAmount>

        <Styles.ProductsPrice>
          <Typography>{translation.sushi.together}</Typography>
          <Typography fontWeight={500} size={5}>
            {singleOrder.price}
            <Typography> {translation.sushi.grn}</Typography>
          </Typography>
        </Styles.ProductsPrice>
      </Styles.BoxTop>
      <Styles.BoxBottom open={open}>
        {singleOrder.order.map(item => {
          let description = item.description[router.locale]
          if (item.description[router.locale].length > 50) {
            description = `${item.description[router.locale].slice(0, 50)}...`
          }
          return (
            <Styles.SingleProduct key={item.id}>
              <Styles.ProductDescription>
                <Styles.ProductImage>
                  <img key={item.id} src={`${item.image}`} alt={'product image'} />
                </Styles.ProductImage>

                <Styles.ProductInfo>
                  <Typography fontWeight={500}>{item.name[router.locale]}</Typography>
                  <div>
                    <Typography textColor={'#F3A229'} fontWeight={400}>{item.quantity} {translation.sushi.g}</Typography>
                    <Typography lineHeight={1.5}> - {description}</Typography>
                  </div>
                </Styles.ProductInfo>
              </Styles.ProductDescription>

              <Styles.ProductsPrice>
                <Typography> {translation.sushi.price}</Typography>
                <Typography fontWeight={500} size={4}>
                  {item.price}
                  <Typography> {translation.sushi.grn}</Typography>
                </Typography>
              </Styles.ProductsPrice>

              <Styles.ProductsAmount>
                <Typography> {translation.sushi.amountFull}</Typography>
                <Typography fontWeight={500} size={4}> {item.amount}</Typography>
              </Styles.ProductsAmount>

              <Styles.ProductsPrice>
                <Typography>{translation.sushi.price} </Typography>
                <Typography fontWeight={500} size={4}>{item.price * item.amount}
                  <Typography> {translation.sushi.grn}</Typography></Typography>
              </Styles.ProductsPrice>
            </Styles.SingleProduct>
          )
        })}
      </Styles.BoxBottom>
    </Styles.SingleOrderContainer>
  )
}

export default SingleOrder
