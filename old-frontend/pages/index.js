import React from 'react'
import withData from '../lib/withData'

export default withData(class Index extends React.Component {
  static async getInitialProps (context) {
    return {}
  }

  render () {
    return (
      <div>Hello</div>
    )
  }
})
