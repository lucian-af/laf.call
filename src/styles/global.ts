import { globalCss, styled, Text } from '@laf.ui/react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: '0',
    margin: '0',
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },
})

export const TextError = styled(Text, {
  color: '#F75A68',
  defaultVariants: {
    size: 'sm',
  },
})
