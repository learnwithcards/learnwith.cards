// @flow
import React from 'react'
import { Link } from '../../routes'
import styled from 'styled-components'
import { PulseLoader } from 'react-spinners'

import Text from '../../design-system/text'
import WebpageLayout from '../../design-system/webpage-layout'

export default class Dashboard extends React.Component<{
  data: {
    loading: boolean,
    allDecks: Array<{
      id: string,
      name: string
    }>
  }
}> {
  isLoading () {
    return this.props.data.loading
  }

  renderLoading () {
    return <PulseLoader loading color='#fb1' />
  }

  renderLoaded () {
    const { data : { allDecks } } = this.props
    return (
      <div>
        {allDecks.map(({ name }) => <div><Link route={`/decks/${name}`}><a>{name}</a></Link></div>)}
      </div>
    )
  }

  render () {
    return this.isLoading()
      ? this.renderLoading()
      : this.renderLoaded()
  }
}
