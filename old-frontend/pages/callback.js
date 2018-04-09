import React from 'react'
import Router from 'next/router'

export default class extends React.Component {
  static async getInitialProps ({ res }) {
    console.log(res)
    if (res) {
      res.writeHead(302, {
        Authorization: `Bearer foo`,
        Location: '/'
      })
      res.end()
      res.finished = true
    } else {
      Router.replace('http://example.com')
    }
    return {}
  }
}
