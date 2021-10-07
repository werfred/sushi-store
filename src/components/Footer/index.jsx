import * as Styles from './styles'
import BaseContainer from '../BaseContainer'
import Typography from '../Typography'


const Footer = () => {
  return (
    <Styles.Footer>
      <BaseContainer>
        <Typography textColor={'#f5f5f5'}>© Sushi Store. All rights reserved.</Typography>
      </BaseContainer>
    </Styles.Footer>
  )
}

export default Footer
