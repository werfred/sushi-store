import * as Styles from './styles'


const Button = (props) => {
  return (
    <Styles.Button {...props}>
      {props.children}
    </Styles.Button>
  )
}

export default Button
