import * as Styles from './styles'


const BaseContainer = (props) => {
  return (
    <Styles.BaseContainer>
      {props.children}
    </Styles.BaseContainer>
  )
}

export default BaseContainer
