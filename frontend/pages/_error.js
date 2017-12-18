import React from 'react'
import styled from 'styled-components'
import Text from '../design-system/text'

// TODO: refactor this into design-system
const Fullscreen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fb1;
  color: white;
`

export default () => {
  debugger
  return <Fullscreen>
    <Text size='l'>404 | Page not found 🙈</Text>
  </Fullscreen>
}
