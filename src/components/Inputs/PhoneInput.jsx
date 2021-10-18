import {useField} from 'formik'

import * as Styles from 'components/Inputs/phoneInputStyles'


const PhoneInput = (props) => {
  const [field, meta] = useField(props)
  return (
    <>
      <Styles.Label>
        {props.label}
        <Styles.PhoneInput
          {...field}
          placeholder={props.placeholder}
          mask="+380 99-999-99-99"
          maskChar=" "
          error={props.error}
          {...props}
        />
      </Styles.Label>
    </>
  )
}

export default PhoneInput
