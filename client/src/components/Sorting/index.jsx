import {useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as Styles from './styles'
import Typography from '../Typography'
import useOutsideClick from '../../hooks/clickOutside'
import {setFilteredProductsAction, setProductsAction} from '../../store'

import DownArrowSorting from '../../images/down-arrow.svg'
import SortIcon from '../../images/sort-icon.svg'


const Sorting = () => {
  const dispatch = useDispatch()
  const filteredProducts = useSelector(state => state.filteredProducts)
  const products = useSelector(state => state.products)

  const [open, setOpen] = useState(false)
  const [currentSorting, setCurrentSorting] = useState('виберіть')

  const sortingContainer = useRef('')
  useOutsideClick(sortingContainer, () => setOpen(false))

  const sortByName = () => {
    let sortedAllProducts = products.sort((a, b) => a.name.localeCompare(b.name))
    let sortedProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
    dispatch(setFilteredProductsAction([...sortedProducts]))
    dispatch(setProductsAction([...sortedAllProducts]))
    setCurrentSorting('назвою')
    setOpen(false)
  }

  const sortByPrice = (direction) => {
    let sortedProducts
    let sortedAllProducts
    if (direction === 'up') {
      sortedAllProducts = products.sort((a, b) => a.price - b.price)
      sortedProducts = filteredProducts.sort((a, b) => a.price - b.price)
      setCurrentSorting('ціною (зростання)')
    } else {
      sortedAllProducts = products.sort((a, b) => b.price - a.price)
      sortedProducts = filteredProducts.sort((a, b) => b.price - a.price)
      setCurrentSorting('ціною (спадання)')
    }
    dispatch(setFilteredProductsAction([...sortedProducts]))
    dispatch(setProductsAction([...sortedAllProducts]))
    setOpen(false)
  }

  return (
    <Styles.Sorting>
      <SortIcon />

      <Styles.SortingTitle onClick={() => setOpen(true)}>
        <DownArrowSorting />
        <Typography>Сортування за:</Typography>
        <Typography textColor={'var(--color-primary)'}>{currentSorting}</Typography>
      </Styles.SortingTitle>

      <Styles.SortingContainer isOpen={open} ref={sortingContainer}>
        <Styles.SortingItem onClick={sortByName}>
          <Typography>назвою</Typography>
        </Styles.SortingItem>

        <Styles.SortingItem onClick={() => sortByPrice('up')}>
          <Typography>ціною (зростання)</Typography>
        </Styles.SortingItem>

        <Styles.SortingItem onClick={() => sortByPrice('down')}>
          <Typography>ціною (спадання)</Typography>
        </Styles.SortingItem>
      </Styles.SortingContainer>
    </Styles.Sorting>
  )
}

export default Sorting
