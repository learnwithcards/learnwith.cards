// @flow
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import DashboardComponent from './dashboard-component.js'

export const USER_DECKS = gql`
  query AuthoredDecks ($userId: ID!) {
    allDecks(
      filter: {
        author: {
          id: $userId
        }
      },
      orderBy: name_ASC
    ) {
      id
      name
    }
  }
`

export default compose(
  graphql(USER_DECKS, {
    options: ({ user }) => {
      return { variables: { userId: user.id } }
    }
  })
)(DashboardComponent)
