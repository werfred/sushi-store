import {useState} from 'react'

import * as Styles from './styles'
import Typography from '../Typography'

function valuetext(value) {
  return `${value}грн`;
}

const PriceRangeFilter = () => {

  const [value, setValue] = useState([100, 500])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Styles.RangeSlider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        max={600}
        min={80}
      />
    </>
  )
}

export default PriceRangeFilter
