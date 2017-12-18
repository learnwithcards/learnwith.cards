// @flow
import React from 'react'
import styled from 'styled-components'

import GithubIcon from '../github-icon'
import Text from '../text'

import { defaultWrapperStyles } from './github-login-default-styles'

// TODO: get this from env
const GITHUB_CLIENT_ID = '6a9f2b394253538562df'
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=read:user`

const Wrapper = styled.a`
  ${defaultWrapperStyles}
`

const GithubLogin = props => (
  <Wrapper href={GITHUB_URL} {...props}>
    <GithubIcon />
    <Text tag='span'>Login with GitHub</Text>
  </Wrapper>
)
export default GithubLogin
