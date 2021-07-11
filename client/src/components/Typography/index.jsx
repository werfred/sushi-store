import React from 'react'

import * as Styles from './styles'


const Typography = props => {
  const CustomTagName = props.variant

  return (
    <Styles.Typography as={CustomTagName} {...props}>
      {props.children}
    </Styles.Typography>
  )
}

Typography.defaultProps = {
  variant: 'span'
}

export default Typography
