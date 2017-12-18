import React from 'react'
import styled from 'styled-components'
import cookie from 'cookie'

import redirect from '../lib/redirect'
import Header from '../components/header'

// TODO: refactor these into design-system components
const Fullscreen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const ScrollableView = styled.div`
  flex: 1;
  overflow-y: scroll;
`

export default Content => {
  class App extends React.Component<*> {
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

    render () {
      const { user, data = {} } = this.props

      const header = user
        ? <Header user={user} onLogout={this.handleLogout} loading={!!data.loading} />
        : null

      return (
        <Fullscreen>
          {header}
          <ScrollableView>
            <Content {...this.props} />
          </ScrollableView>
        </Fullscreen>
      )
    }
  }

  return App
}
