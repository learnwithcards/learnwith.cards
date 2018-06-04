import React from 'react'
import { gql } from 'apollo-boost'

import Landing from './landing'
import Dashboard from './dashboard'

export default class Index extends React.Component {
  static async getInitialProps (context) {
    let props = {}

    try {
      await context.apolloClient.query({
        query: gql`
          query loggedInUser {
            loggedInUser { id }
          }
        `
      })

      props = { loggedIn: true }
    } catch (e) {
      console.error(e)
      props = { loggedIn: false }
    }

    return props
  }

  render () {
    return this.props.loggedIn ? <Dashboard /> : <Landing />
  }
}
