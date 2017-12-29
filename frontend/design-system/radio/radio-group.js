// @flow
import React from 'react'
import styled from 'styled-components'

const RadioGroupWrapper = styled.div`
  display: flex;
`

export default class RadioGroup extends React.Component<*> {
  renderChildren () {
    const { name, value, disabledValue, onChange, children, ...rest } = this.props
    return React.Children.map(children, child => React.cloneElement(child, {
      name,
      checked: child.props.value === value,
      disabled: child.props.value === disabledValue,
      onChange
    }))
  }

  render () {
    return (
      <RadioGroupWrapper>
        {this.renderChildren()}
      </RadioGroupWrapper>
    )
  }
}
