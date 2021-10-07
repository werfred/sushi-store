import * as Styles from './styles'
import {useSelector} from 'react-redux'


const Loader = () => {
  const isLoading = useSelector(state => state.isLoading)

  return (
    <>
      {isLoading && (
        <Styles.LoaderContainer>
          <Styles.Loader>
            {Array.from(Array(8).keys()).map((item, index) => <div key={`loader-item-${index}`} />)}
          </Styles.Loader>
        </Styles.LoaderContainer>
      )}
    </>
  )
}

export default Loader
