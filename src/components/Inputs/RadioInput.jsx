import {Field} from 'formik'

import * as Styles from 'components/Inputs/radioInputStyles'


const RadioInput = (props) => {
  return (
    <Styles.Label>
      <Styles.RadioInput>
        <Field value={props.value} type="radio" name={props.name} checked={props.checked}/>
        <Styles.RadioControl />
      </Styles.RadioInput>
      <Styles.RadioLabel>{props.label}</Styles.RadioLabel>
    </Styles.Label>
  )
}

export default RadioInput
