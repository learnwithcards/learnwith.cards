import React from 'react'

// TODO: move github client ID to read from environment variable

export default () => (
  <div>
    <p>
      Well, hello there!
    </p>
    <p>
      We're going to now talk to the GitHub API. Ready?{' '}
      <a href='https://github.com/login/oauth/authorize?client_id=6a9f2b394253538562df'>Click here</a> to begin!
    </p>
  </div>
)
