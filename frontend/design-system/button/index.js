// @flow
import styled from 'styled-components'
import defaultStyles from './button-default-styles'
import { minimal } from './button-mixins'

const Button = styled.button`
  ${defaultStyles}
  ${props => props.variant === 'minimal' ? minimal : ''}
`
Button.defaultProps = {
  variant: 'minimal'
}

export default Button
