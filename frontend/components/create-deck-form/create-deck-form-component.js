// @flow
import React from 'react'
import styled from 'styled-components'

import Text from '../../design-system/text'
import WebpageLayout from '../../design-system/webpage-layout'

const Input = styled.input`
  height: 48px;
  width: 100%;
  padding: 8px 12px;
  font-size: 26px;
  line-height: 32px;
  ${props => props.validation === 'error' ? 'border: 1px solid #fa113d;' : ''}
`

const TextWithMargin = styled(Text)`
  margin-bottom: 16px;
`

const Submit = styled.input.attrs({
  type: 'submit'
})`
  margin-top: 16px;
  width: 100%;
  border: none;
  border-radius: 3px;
  height: 48px;
  font-size: 26px;
  background-color: #50c001;
  color: white;
  cursor: pointer;

  ${props => props.disabled ? `
    background-color: rgba(80, 192, 1, 0.5);
    color: rgba(255, 255, 255, 0.8);
    pointer-events: none;
  `: ''}
`

type State = {
  name: string,
  validation: 'default' | 'error',
  loading: boolean
}
export default class CreateDeckForm extends React.Component<{
  CreateDeckMutation: Function,
  onSubmit: (e: Event, state: State) => void
}, State> {
  input: ?HTMLInputElment
  state = {
    name: '',
    validation: 'default',
    loading: false
  }

  componentDidMount () {
    this.input && this.input.focus()
  }

  handleChange = (e: Event) => {
    this.setState({
      name: e.target.value,
      validation: 'default'
    })
  }

  handleSubmit = async (e: Event) => {
    e.preventDefault()
    const { user, CreateDeckMutation, onSuccess } = this.props

    this.setState({
      loading: true
    })

    try {
      const response = await CreateDeckMutation({
        variables: {
          authorId: user.id,
          ...this.state
        }
      })
      onSuccess(response.data.createDeck.name)
    } catch (e) {
      this.setState({ validation: 'error' })
    }

    this.setState({
      loading: false
    })
  }

  render () {
    const { user, CreateDeckMutation, onSuccess, ...rest } = this.props
    const { name, validation, loading } = this.state

    const hint = validation === 'error'
      ? <TextWithMargin size='m' tag='p' style={{ color: '#fa113d' }}>That name is taken 😱</TextWithMargin>
      : <TextWithMargin size='m' tag='p'>For example <i>Spanish Vocabulary</i></TextWithMargin>

    return (
      <form {...rest} onSubmit={this.handleSubmit}>
        <TextWithMargin size='xl' tag='h2'>Create a new deck</TextWithMargin>
        <Text size='l' tag='label'>Name</Text>
        {hint}
        <Input
          innerRef={input => this.input = input}
          type='text'
          value={name}
          validation={validation}
          onChange={this.handleChange}
        />
        <Submit disabled={!name || loading} value='Create' />
      </form>
    )
  }
}
