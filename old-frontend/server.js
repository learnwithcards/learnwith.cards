const { parse } = require('url')
const match = require('micro-route/match')
const next = require('next')
const ApolloClient = require('apollo-boost')

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjfr153bk0zwk0153bqtq0774'
})

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

const routes = {
  '/github-callback': (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { query } = parsedUrl

    console.log(query)
    console.log(client)

    res.writeHead(302, {
      Location: '/'
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
