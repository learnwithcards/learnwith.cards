import React from 'react'
import cookie from 'cookie'
import { withApollo, compose, Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'

import withData from '../lib/withData'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'

const LOGGED_IN_USER = gql`
  query loggedInUser {
    loggedInUser {
      id
    }
  }
`

const CREATE_DECK = gql`
  mutation createDeck(
    $name: String!,
    $authorId: ID!
  ) {
    createDeck(name: $name, authorId: $authorId) {
      id
    }
  }
`

class CreateDeckForm extends React.Component {
  render () {
    return (
      <Query query={LOGGED_IN_USER}>
        {({ data }) => (
          <Mutation mutation={CREATE_DECK}>
            {createDeck => (
              <button
                onClick={() => createDeck({
                  variables: { name: 'bar', authorId: data.loggedInUser.id }
                })}
              >
                Create a deck!
              </button>
            )}
          </Mutation>
        )}
      </Query>
    )
  }
}

class Index extends React.Component {
  static async getInitialProps (context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    if (!loggedInUser) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/login')
    }

    return { loggedInUser }
  }

  signout = () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    this.props.client.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/login')
    })
  }

  render () {
    return (
      <div>
        Hello {this.props.loggedInUser.name}!<br />
        <CreateDeckForm />
        <button onClick={this.signout}>Sign out</button>

      </div>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(Index)
