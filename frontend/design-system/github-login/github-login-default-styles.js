// @flow
import {
  defaultBorderRadius,
  brandedTextColor
} from '../shared/rules'

import { centerVertically } from '../shared/mixins'

import {
  loginPadding,
  whiteBackground,
  spaceBetweenChildren
} from './github-login-rules'

export const defaultWrapperStyles = [
  centerVertically,
  defaultBorderRadius,
  brandedTextColor,
  loginPadding,
  whiteBackground,
  spaceBetweenChildren
].join('')
