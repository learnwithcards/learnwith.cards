// @flow
import {
  defaultFontFamily,
  inheritTextColor,
  defaultFontSize,
  defaultLineHeight,
  flex,
  alignItemsCenter
} from './rules'

export const defaultFont = [
  defaultFontFamily,
  inheritTextColor,
  defaultFontSize,
  defaultLineHeight
].join('')

export const centerVertically = [
  flex,
  alignItemsCenter
].join('')
