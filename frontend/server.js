require('@babel/register')({
  presets: ['@babel/env']
})

const { parse } = require('url')
const match = require('micro-route/match')
const next = require('next')
const gql = require('apollo-boost')

const initApollo = require('./lib/init-apollo').default

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

const routes = {
  '/github-callback': async (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { query } = parsedUrl

    const apollo = initApollo()
    const response = await apollo.mutate({
      mutation: gql`
        mutation authenticateUser($githubCode: String!) {
          authenticateUser(githubCode: $githubCode) {
            token
          }
        }
      `,
      variables: { githubCode: query.code }
    })

    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': [`token=${response.data.authenticateUser.token}`]
    })
    res.end()
    res.finished = true
  }
}

async function main (req, res) {
  for (let route in routes) {
    if (match(req, route)) {
      return routes[route](req, res)
    }
  }

  const parsedUrl = parse(req.url, true)
  return handle(req, res, parsedUrl)
}

async function setup (handler) {
  await app.prepare()
  return handler
}

module.exports = setup(main)
