// @flow
import type { User } from '../types'

import * as React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { ClipLoader } from 'react-spinners'

import Button from '../design-system/button'
import Text from '../design-system/text'
import WebpageLayout from '../design-system/webpage-layout'

import Logo from './logo'

const Distribute = styled.div`
  display: flex;
  align-items: center;

  & > * {
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
`

const Spread = ({ style = {}, ...rest }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    ...style
  }} {...rest} />
)

const Header = ({
  user,
  onLogout,
  loading
}: {
  user: User,
  onLogout: () => void,
  loading: boolean
}) => {
  const { avatarUrl } = user
  return (
    <WebpageLayout variant='header'>
      <Spread style={{
        padding: '16px 0 16px 0'
      }}>
        <Distribute>
          <Link href='/'>
            <a><Logo /></a>
          </Link>
          <ClipLoader color='#fff' loading={loading} size={30} />
        </Distribute>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Link prefetch href='/new'>
            <a>
              <Text size='l'>+</Text>
            </a>
          </Link>
          <img src={avatarUrl} style={{
            width: '32px',
            height: '32px',
            borderRadius: '3px',
            cursor: 'pointer',
            margin: '0 24px 0 16px'
          }}/>
          <Button onClick={onLogout}>Logout</Button>
        </div>
      </Spread>
    </WebpageLayout>
  )
}
export default Header
