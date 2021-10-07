import React from 'react'

import * as Styles from './styles'


const Typography = props => {
  const CustomTagName = props.tag

  return (
    <Styles.Typography as={CustomTagName} {...props}>
      {props.children}
    </Styles.Typography>
  )
}

Typography.defaultProps = {
  tag: 'span'
}

export default Typography
