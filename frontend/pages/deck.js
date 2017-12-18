import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Error from '../pages/_error'
import withAuth from '../lib/with-auth'
import WebpageLayout from '../design-system/webpage-layout'
import Text from '../design-system/text'

class Profile extends React.Component {
  static async getInitialProps ({ query }) {
    return {
      name: query.slug
    }
  }

  render () {
    const {
      loading,
      name,
      isAuthorView
    } = this.props

    if (loading) {
      // TODO: can we move this to the server?
      return null
    }

    if (!loading && !name) {
      return <Error />
    }

    const addCards = isAuthorView
      ? <Text>AddCards</Text>
      : null

    return (
      <WebpageLayout variant='content'>
        <Text size='xl'>{name}</Text>
        {addCards}
      </WebpageLayout>
    )
  }
}

export const GET_DECK = gql`
  query GetDeck ($name: String!) {
    Deck(name: $name) {
      id
      name
      author {
        id
      }
    }
  }
`

export default compose(
  withAuth,
  graphql(GET_DECK, {
    props: ({ ownProps, data: { loading, Deck } }) => ({
      loading,
      name: Deck && Deck.name,
      isAuthorView: Deck && Deck.author.id === ownProps.user.id
    })
  })
)(Profile)
