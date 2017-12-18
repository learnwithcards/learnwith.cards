import React from 'react'
import cookie from 'cookie'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'

import initApollo from './init-apollo'

function parseCookies (ctx = {}, options = {}) {
  let cookieString = ''
  if (ctx.req && ctx.req.headers.cookie) {
    cookieString = ctx.req.headers.cookie
  } else if (typeof document !== 'undefined') {
    cookieString = document.cookie
  }

  return cookie.parse(cookieString, options)
}

export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName})`
    static propTypes = {
      serverState: PropTypes.object.isRequired
    }

    static async getInitialProps (context) {
      // Setup a server-side one-time-use apollo client for initial props and
      // rendering (on server)
      let apollo = initApollo({}, {
        getToken: () => parseCookies(context).token
      })

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(context, apollo)
      }

      // Run all graphql queries in the component tree
      // and extract the resulting data
      let serverState
      if (!process.browser) {
        if (context.res && context.res.finished) {
          // When redirecting, the response is finished.
          // No point in continuing to render
          return
        }

        // Provide the `url` prop data in case a graphql query uses it
        const url = {query: context.query, pathname: context.pathname}

        // Run all graphql queries
        const app = (
          <ApolloProvider client={apollo}>
            <ComposedComponent url={url} {...composedInitialProps} />
          </ApolloProvider>
        )
        await getDataFromTree(app)

        // Extract query data from the Apollo's store
        serverState = apollo.extract()
      }

      return {
        serverState,
        ...composedInitialProps
      }
    }

    constructor (props) {
      super(props)
      const serverState = typeof window !== 'undefined'
        ? window.__APOLLO_STATE__
        : props.serverState
      this.apollo = initApollo(serverState, {
        getToken: () => parseCookies().token
      })
    }

    render () {
      return (
        <div>
          <ApolloProvider client={this.apollo}>
            <ComposedComponent {...this.props} />
          </ApolloProvider>
          <script
            charSet="UTF-8"
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${JSON.stringify(this.props.serverState)};`,
            }}
          />
        </div>
      )
    }
  }
}
