import React from 'react'

// TODO: get this from env
const GITHUB_CLIENT_ID = '6a9f2b394253538562df'
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=read:user`

const LoginScreen = () => (
  <div>
    <a href={GITHUB_URL}>Login with GitHub</a>
  </div>
)

export default LoginScreen
