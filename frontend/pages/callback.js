// TODO: We should put all this logic in the server...
import React from 'react'
import gql from 'graphql-tag'

import withData from '../lib/with-data'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/check-logged-in'

const AUTHENTICATE_GITHUB_USER = gql`
  mutation AuthenticateUserMutation($githubCode: String!) {
    authenticateUser(githubCode: $githubCode) {
      token
    }
  }
`

class Callback extends React.Component {
  static async getInitialProps (context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/')
    }

    // convert code to string
    const githubCode = `${context.query.code}`

    try {
      const { data: { authenticateUser : { token } } } = await apolloClient.mutate({
        mutation: AUTHENTICATE_GITHUB_USER,
        variables: { githubCode : context.query.code }
      })

      context.res.setHeader('Set-Cookie', [`token=${token}`])
      redirect(context, '/')
    } catch (error) {
      console.error(error)
    }
  }

  // This should never execute...
  render () {
    throw new Error('Forgot to redirect /callback to / ?')
    return null
  }
}

export default withData(Callback)
