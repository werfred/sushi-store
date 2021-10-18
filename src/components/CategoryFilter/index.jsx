import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useRouter} from 'next/router'

import * as Styles from './styles'
import Button from '../Button'
import {setCurrentCategoryAction, setFilteredProductsAction, setFilteredProductsByCategoryAction} from 'store'
import {settings} from './constants'


const CategoryFilter = ({categories}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const translation = useSelector(state => state.currentTranslation)

  const [selectedCategory, setSelectedCategory] = useState('All')

  const filterByCategory = (category) => {
    let filteredProducts = products.filter((product) => product.categoryName.en === category)
    if (category === 'All') {
      dispatch(setFilteredProductsAction(products))
    } else {
      dispatch(setFilteredProductsAction(filteredProducts))
      dispatch(setFilteredProductsByCategoryAction(filteredProducts))
    }
    setSelectedCategory(category)
  }

  useEffect(() => {
    dispatch(setCurrentCategoryAction(selectedCategory))
  }, [dispatch, selectedCategory])


  return (
    <Styles.FilterOptions {...settings}>
      <Button active={selectedCategory === 'All'} onClick={() => filterByCategory('All')}>
        {translation.homePage.all}
      </Button>
      {categories.map((category, index) => (
        <Button
          key={index}
          active={selectedCategory === category.categoryName.en}
          onClick={() => filterByCategory(category.categoryName.en)}>
          {category.categoryName[router.locale]}
        </Button>
      ))}
    </Styles.FilterOptions>
  )
}

export default CategoryFilter
