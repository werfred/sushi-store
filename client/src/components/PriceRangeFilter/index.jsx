import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as Styles from './styles'
import {setFilteredProductsAction, setProductsAction} from '../../store'


function valuetext(value) {
  return `${value}грн`
}

const PriceRangeFilter = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const filteredProducts = useSelector(state => state.filteredProducts)

  const [value, setValue] = useState([100, 380])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    let byPriceFiltered = filteredProducts.filter((product) => product.price > newValue[0] && product.price < newValue[1])
    let byPriceFilteredAll = products.filter((product) => product.price > newValue[0] && product.price < newValue[1])
    dispatch(setFilteredProductsAction(byPriceFiltered))
    dispatch(setProductsAction(byPriceFilteredAll))
  }

  return (
    <>
      <Styles.RangeSlider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        max={400}
        min={80}
      />
    </>
  )
}

export default PriceRangeFilter
