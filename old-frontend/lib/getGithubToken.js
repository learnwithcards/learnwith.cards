import * as fetch from 'isomorphic-fetch'

export async function getGithubToken (githubCode) {
  const endpoint = 'https://github.com/login/oauth/access_token'

  const data = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: '6a9f2b394253538562df',
      client_secret: '8b72f5cd23a524d9ed8ffe555a800657faa1c013',
      code: githubCode
    })
  })
    .then(response => response.json())

  if (data.error) {
    throw new Error(JSON.stringify(data.error))
  }

  return data.access_token
}
