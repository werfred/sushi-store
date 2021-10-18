import {useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as Styles from './styles'
import Typography from '../Typography'
import useOutsideClick from '../../hooks/clickOutside'
import {setFilteredProductsAction, setProductsAction} from 'store'

import DownArrowSorting from '../../images/down-arrow.svg'
import SortIcon from '../../images/sort-icon.svg'
import {Transition} from 'react-transition-group'


const Sorting = () => {
  const dispatch = useDispatch()

  const translation = useSelector(state => state.currentTranslation)
  const filteredProducts = useSelector(state => state.filteredProducts)
  const products = useSelector(state => state.products)

  const [open, setOpen] = useState(false)
  const [currentSorting, setCurrentSorting] = useState('')

  const sortingContainer = useRef('')
  useOutsideClick(sortingContainer, () => setOpen(false))

  const sortByName = () => {
    let sortedAllProducts = products.sort((a, b) => a.name.en.localeCompare(b.name.en))
    let sortedProducts = filteredProducts.sort((a, b) => a.name.en.localeCompare(b.name.en))
    dispatch(setFilteredProductsAction([...sortedProducts]))
    dispatch(setProductsAction([...sortedAllProducts]))
    setCurrentSorting(translation.sorting.byName)
    setOpen(false)
  }

  const sortByPrice = (direction) => {
    let sortedProducts
    let sortedAllProducts
    if (direction === 'up') {
      sortedAllProducts = products.sort((a, b) => a.price - b.price)
      sortedProducts = filteredProducts.sort((a, b) => a.price - b.price)
      setCurrentSorting(translation.sorting.priceUp)
    } else {
      sortedAllProducts = products.sort((a, b) => b.price - a.price)
      sortedProducts = filteredProducts.sort((a, b) => b.price - a.price)
      setCurrentSorting(translation.sorting.priceDown)
    }
    dispatch(setFilteredProductsAction([...sortedProducts]))
    dispatch(setProductsAction([...sortedAllProducts]))
    setOpen(false)
  }

  return (
    <Styles.Sorting ref={sortingContainer}>
      <Styles.SortingTitle onClick={() => setOpen(true)}>
        <SortIcon />
        <DownArrowSorting />
        <Typography>{translation.sorting.sortBy}:</Typography>
        <Typography textColor={'var(--color-primary)'}>
          {currentSorting === '' ? translation.sorting.choose : currentSorting}
        </Typography>
      </Styles.SortingTitle>

      <Transition
        in={open}
        appear={open}
        timeout={100}
        unmountOnExit
        mountOnEnter>
        {(state) => (
          <Styles.SortingContainer state={state}>
            <Styles.SortingItem onClick={sortByName}>
              <Typography>{translation.sorting.byName}</Typography>
            </Styles.SortingItem>

            <Styles.SortingItem onClick={() => sortByPrice('up')}>
              <Typography>{translation.sorting.priceUp}</Typography>
            </Styles.SortingItem>

            <Styles.SortingItem onClick={() => sortByPrice('down')}>
              <Typography>{translation.sorting.priceDown}</Typography>
            </Styles.SortingItem>
          </Styles.SortingContainer>
        )}
      </Transition>
    </Styles.Sorting>
  )
}

export default Sorting
