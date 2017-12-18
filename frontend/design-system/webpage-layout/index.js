// @flow
import * as React from 'react'
import styled from 'styled-components'
import { wrapperStyles, contentStyles } from './default-styles'
import {
  headerVariantBackground,
  headerVariantMaxWidth,
  contentVariantMaxWidth,
  contentVariantTextColor,
  contentVariantPadding
} from './webpage-layout-rules'

import { whiteTextColor } from '../shared/rules'

const Wrapper = styled.div`
  ${wrapperStyles}
  ${props => props.variant === 'header' ? headerVariantBackground : ''}
  ${props => props.variant === 'header' ? whiteTextColor: ''}
`

const Centered = styled.div`
  ${contentStyles}
  ${props => props.variant === 'header' ? headerVariantMaxWidth : ''}
  ${props => props.variant === 'content' ? contentVariantMaxWidth: ''}
  ${props => props.variant === 'content' ? contentVariantTextColor: ''}
  ${props => props.variant === 'content' ? contentVariantPadding: ''}
`

const WebpageLayout = ({
  variant,
  children,
  ...rest
}: {
  variant: 'header' | 'content',
  children: React.Node
}) => (
  <Wrapper variant={variant}>
    <Centered variant={variant}>
      {children}
    </Centered>
  </Wrapper>
)

export default WebpageLayout
