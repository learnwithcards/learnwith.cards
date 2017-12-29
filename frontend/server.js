const micro = require('micro')
const match = require('micro-route/match')
const { parse } = require('url')
const next = require('next')
const wr = require('wordreference-api')

const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

const server = micro(async (req, res) => {
  const parsedUrl = parse(req.url, true)

  // TODO: we could probably put this into its own service...
  if (match(req, '/_translate')) {
    const { text, from, to, limit = 5, offset = 0} = parsedUrl.query
    const result = await wr(text, from, to)
    const translations = result.translations
      .map(({ translations }) => translations )
      .reduce((total, current) => [ ...total, ...current ], [])

    const page = translations.slice(offset, limit)
    return page
  }

  return handle(req, res, parsedUrl)
})

app.prepare().then(() => {
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
