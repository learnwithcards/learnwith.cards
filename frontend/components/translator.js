// @flow
import React from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import Text from '../design-system/text'
import { RadioGroup, RadioButton } from '../design-system/radio'

const Distribute = styled.div`
  margin-top: 16px;

  & > * {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`

const LanguagesWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  & > * {
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
`

const Input = styled.input`
  height: 48px;
  width: 100%;
  padding: 8px 12px;
  font-size: 26px;
  line-height: 32px;

  margin-top: 16px;
  margin-bottom: 16px;
`

const emojiFlag = (language: 'en' | 'fr' | 'es') => {
  if (language === 'en') return '🇺🇸'
  if (language === 'fr') return '🇫🇷'
  if (language === 'es') return '🇪🇸'
}

const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;

  & > * {
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
`

const Spread = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

//  ${props => props.selected ? 'box-shadow: 2px 2px 1px 0 rgba(255, 187, 17, 0.5);' : ''}
// TODO: refactor this into design-system
const Table = styled.table`
  width: 100%;
  table-layout: fixed;

  font-family: Karla, sans-serif;
  cursor: pointer;

  border: 1px solid #ccc;
  ${props => props.selected ? 'border: 1px solid rgba(80, 192, 1, 0.5);' : ''}
  padding: 15px;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  ${props => props.selected ? 'box-shadow: 2px 2px 1px 0 rgba(80, 192, 1, 0.2);' : ''}
  &:hover {
    ${props => !props.selected ? 'box-shadow: 2px 2px 1px 0 rgba(0, 0, 0, 0.2);' : ''}
  }

  tr:not(:last-child) {
    padding-bottom: 8px;
  }

  td {
    vertical-align: text-top;
    padding: 8px 0;
  }

  td:first-child {
    width: 32px;
  }

  td:last-child {
    width: 55%;
  }
`

const Button = styled.button`

  padding: 0px 8px;
  border: none;

  text-align: center;

  color: white;
  border-radius: 3px;
  font-size: 15px;
  line-height: 24px;
  cursor: pointer;
  background-color: #50c001;

  ${props => props.disabled ? `
    background-color: rgba(80, 192, 1, 0.5);
    color: rgba(255, 255, 255, 0.8);
    pointer-events: none;
  `: ''}
`

const Bold = styled.span`
  font-weight: 700;
`
export default class Translator extends React.Component<*, {
  text: string
}> {
  input: ?HTMLInputElment

  state = {
    from: 'en',
    to: 'fr',
    text: '',
    translations: [],
    selectedCard: null
  }

  componentDidMount () {
    this.input && this.input.focus()
  }

  async componentDidUpdate (_, prevState) {
    const {
      text,
      from,
      to
    } = this.state

    if (prevState.text !== text
      || (prevState.from !== from)
      || (prevState.to !== to))
    {
      const query = queryString.stringify({
        text,
        from,
        to
      })

      try {
        const response = await fetch(`/_translate?${query}`)
        const translations = await response.json()
        this.setState({ translations })
      } catch (e) {
        // TODO: hmmm maybe we should log this?
      }
    }
  }

  handleChange = e => {
    this.setState({
      text: e.target.value,
      selectedCard: null
    })
  }

  handleFromChange = from => {
    this.setState({
      from,
      selectedCard: null
    })
  }

  handleToChange = to => {
    this.setState({
      to,
      selectedCard: null
    })
  }

  handleCardClick = index => {
    let { selectedCard } = this.state
    selectedCard = index === selectedCard
      ? null
      : index

    this.setState({ selectedCard })
  }

  handleAddCard = e => {
    const { onAddCard } = this.props
    const { selectedCard, translations } = this.state
    const payload = translations[selectedCard]
    console.log('TODO: implement handleAddCard', payload)
    onAddCard && onAddCard(e, payload)
  }

  renderTranslations () {
    const { translations, from: fromLanguage, to: toLanguage, selectedCard } = this.state
    return translations.map((data, index) => {
      const { from, to, example } = data
      const fromExample = example && example.from && example.from[0]
      const toExample = example && example.to && example.to[0]
      return (
        <Table
          key={from + index}
          selected={index === selectedCard}
          onClick={() => this.handleCardClick(index)}
        >
          <tbody>
            <tr>
              <td>{emojiFlag(fromLanguage)}</td>
              <td><Bold>{from}</Bold></td>
              <td>{fromExample}</td>
            </tr>
            <tr>
              <td>{emojiFlag(toLanguage)}</td>
              <td><Bold>{to}</Bold></td>
              <td>{toExample}</td>
            </tr>
          </tbody>
        </Table>
      )
    })
  }

  render () {
    const { text, translations, from, to, selectedCard } = this.state

    return (
      <Distribute>
        <Spread>
          <LanguagesWrapper>
            <RadioGroup name='from' onChange={this.handleFromChange} value={from} disabledValue={to}>
              <RadioButton value='en'>🇺🇸</RadioButton>
              <RadioButton value='fr'>🇫🇷</RadioButton>
              <RadioButton value='es'>🇪🇸</RadioButton>
            </RadioGroup>

            <Text size='l' tag='span' style={{ color: '#AAA', fontFamily: 'Arial' }}>→</Text>

            <RadioGroup name='to' onChange={this.handleToChange} value={to} disabledValue={from}>
              <RadioButton value='en'>🇺🇸</RadioButton>
              <RadioButton value='fr'>🇫🇷</RadioButton>
              <RadioButton value='es'>🇪🇸</RadioButton>
            </RadioGroup>
          </LanguagesWrapper>
          <Button
            disabled={selectedCard === null}
            onClick={this.handleAddCard}
          >
            +
          </Button>
        </Spread>

        <Input
          innerRef={input => this.input = input}
          type='text'
          value={text}
          onChange={this.handleChange}
        />

        <div>
          {this.renderTranslations()}
        </div>
      </Distribute>
    )
  }
}
