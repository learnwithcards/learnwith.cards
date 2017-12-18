// @flow
import React from 'react'
import { Router } from '../routes'
import styled from 'styled-components'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import redirect from '../lib/redirect'
import withAuth from '../lib/with-auth'
import Text from '../design-system/text'
import WebpageLayout from '../design-system/webpage-layout'
import CreateDeckForm from '../components/create-deck-form'

const Center = styled.div`
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  color: #333;
  padding: 32px;
  width: 100%;
  max-width: 664px;
`

class New extends React.Component {
  handleCreateDeckSuccess = (name) => {
    Router.pushRoute(`/decks/${name}`)
  }

  render () {
    const { user } = this.props

    return (
      <WebpageLayout variant='content'>
        <CreateDeckForm
          user={user}
          onSuccess={this.handleCreateDeckSuccess}
        />
      </WebpageLayout>
    )
  }
}

export default compose(
  withAuth
)(New)
