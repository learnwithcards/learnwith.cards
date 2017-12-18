// @flow
import React from 'react'
import { compose } from 'react-apollo'

import withAuth from '../lib/with-auth'
import Dashboard from '../components/dashboard'
import LoginScreen from '../components/login-screen'

class Index extends React.Component {
  renderLoggedInView () {
    const { user } = this.props
    return <Dashboard user={user} />
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
  withAuth
)(Index)
