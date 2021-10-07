import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as Styles from './styles'
import {setFilteredProductsAction} from 'store'


function valuetext(value) {
  return `${value}грн`
}

const PriceRangeFilter = () => {
  const dispatch = useDispatch()

  const products = useSelector(state => state.products)
  const currentCategory = useSelector(state => state.currentCategory)
  const filteredProductsByCategory = useSelector(state => state.filteredProductsByCategory)

  const [value, setValue] = useState([100, 380])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const filterByPrice = (event, value) => {
    if (currentCategory === 'All') {
      let byPriceFilteredAll = products.filter((product) => product.price > value[0] && product.price < value[1])
      dispatch(setFilteredProductsAction(byPriceFilteredAll))
    } else {
      let byPriceFiltered = filteredProductsByCategory.filter((product) => product.price > value[0] && product.price < value[1])
      dispatch(setFilteredProductsAction(byPriceFiltered))
    }
  }

  useEffect(() => {
    setValue([100, 380])
  }, [currentCategory])


  return (
    <>
      <Styles.RangeSlider
        value={value}
        onChange={handleChange}
        onChangeCommitted={filterByPrice}
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
