import * as Styles from './styles'
import Typography from '../Typography'


const Heading = (props) => {
  return (
    <Styles.Heading>
      <Typography fontWeight={'600'} size={'6'}>{props.children}</Typography>
    </Styles.Heading>
  )
}

export default Heading
