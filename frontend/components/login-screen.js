// @flow
import React from 'react'
import styled from 'styled-components'

import Text from '../design-system/text'
import GithubLogin from '../design-system/github-login'

const Fullscreen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fb1;
`

const Distribute = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 16px;
  }
`

const LoginScreen = () => (
  <Fullscreen>
    <Distribute>
      <Text size='l' tag='h1'>learnwith.cards</Text>
      <GithubLogin />
    </Distribute>
  </Fullscreen>
)

export default LoginScreen
