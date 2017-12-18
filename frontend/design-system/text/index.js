// @flow
import React from 'react'
import styled from 'styled-components'
import defaultStyles from './text-default-styles'
import { fontL, fontXL } from './text-mixins'

const Text = ({
  tag,
  size,
  ...rest
}: {
  tag: string,
  size: 'm' | 'l' | 'xl'
}) => {
  // TODO: don't compute this dynamically
  // $FlowFixMe
  const Tag = styled(tag)`
    ${defaultStyles}
    ${props => props.size === 'l' ? fontL : ''}
    ${props => props.size === 'xl' ? fontXL : ''}
  `

  return <Tag size={size} {...rest} />
}
Text.defaultProps = {
  tag: 'div',
  size: 'm'
}

export default Text
