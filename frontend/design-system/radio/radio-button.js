// @flow
import React from 'react'
import styled from 'styled-components'

const RadioInput = styled.input.attrs({
  type: 'radio'
})`
  display: none;
`

const Label = styled.label`
  padding: 9px 24px 9px 22px;
  border: 1px solid #ccc;
  
  /* only one pixel border between buttons */
  /* right-border will come from the right-neighbor */
  border-width: 2px 0 2px 2px;
  
  cursor: pointer;

  &:last-child {
    /* last child needs to add back the right-border */
    border-width: 2px;
  }

  ${props => props.checked ? `
    pointer-events: none;
    border-color: #fb1 !important;
    /* border-color: #5ad !important; */

    /* because the right-border comes from the right-neighbor
       we need to change the border-left-color
       of the selected child's sibling

       WARNING: this is very fragile because
       the selector is tied to the DOM
    */

    &:not(:last-child) + input + label {
      border-left-color: #fb1 !important;
      /* border-left-color: #5ad !important; */
    }
  `: ''}

  ${props => props.disabled ? 'pointer-events: none;' : ''}

  /* This needs to be just on the text */
  /* otherwise grayscale will affect the borders */
  & > .text-content {
    filter: grayscale(${props => props.disabled ? '100%' : '0%'});
  }

  &:hover {
    /* border-color: rgba(85, 170, 221, 0.4); */
    border-color: rgba(255, 187, 17, 0.4);
  }

  &:not(:last-child):hover + input + label {
    /* border-left-color: rgba(85, 170, 221, 0.4); */
    border-left-color: rgba(255, 187, 17, 0.4);
  }
`

const RadioButton = ({ name, value, onChange, children, ...rest }) => (
  <React.Fragment>
    <RadioInput name={name} value={value} />
    <Label onClick={() => onChange(value)} {...rest}>
      <span className='text-content'>{children}</span>
    </Label>
  </React.Fragment>
)

export default RadioButton
