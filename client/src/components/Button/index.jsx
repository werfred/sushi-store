import * as Styles from './styles'


const Button = (props) => {
  return (
    <Styles.Button active={props.active} {...props}>
      {props.children}
    </Styles.Button>
  )
}

export default Button
