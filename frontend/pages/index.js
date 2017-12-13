import React from 'react'
import cookie from 'cookie'
import { withApollo, compose } from 'react-apollo'

import withData from '../lib/with-data'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/check-logged-in'

import Dashboard from '../components/dashboard'
import LoginScreen from '../components/login-screen'

class Index extends React.Component {
  static async getInitialProps (context, apolloClient) {
    const { loggedInUser: { user } } = await checkLoggedIn(context, apolloClient)
    return { user }
  }

  handleLogout = () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    this.props.client.resetStore().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/')
    })
  }

  renderLoggedInView () {
    const { user } = this.props
    return <Dashboard user={user} onLogout={this.handleLogout} />
  }

  renderLoggedOutView () {
    return <LoginScreen />
  }

  render () {
    const { user } = this.props
    return user
      ? this.renderLoggedInView()
      : this.renderLoggedOutView()
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(Index)
