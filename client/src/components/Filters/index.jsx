import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as Styles from './styles'
import Button from '../Button'
import {setFilteredProductsAction} from '../../store'


const Filters = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  // const [active, setActive] = useState({
  //   All: true,
  //   Classic: false,
  //   Maki: false,
  //   Dragon: false,
  //   Baked: false,
  //   Felix: false,
  //   Sweet: false,
  // })
  //
  // const setActivityState = (keyName) => {
  //   let newActives = {}
  //   Object.keys(active).forEach(key => {
  //     newActives = {...newActives, [key]: key === keyName}
  //   })
  //   setActive(newActives)
  // }

  const filter = (category) => {
    let filteredProducts = products.filter((product) => product.category_name === category)
    if (filteredProducts.length === 0){
      dispatch(setFilteredProductsAction(products))
    } else {
      dispatch(setFilteredProductsAction(filteredProducts))
    }
    //setActivityState(category)
  }

  return (
    <Styles.FilterOptions>
      <Button onClick={() => filter('All')}>Усе</Button>
      <Button onClick={() => filter('Classic')}>Класичні</Button>
      <Button onClick={() => filter('Maki')}>Маки</Button>
      <Button onClick={() => filter('Dragon')}>Дракони</Button>
      <Button onClick={() => filter('Baked')}>Запечені</Button>
      <Button onClick={() => filter('Felix')}>Фелікси</Button>
      <Button onClick={() => filter('Sweet')}>Солодкі</Button>
    </Styles.FilterOptions>
  )
}

export default Filters
