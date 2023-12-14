import { Box, Text, styled } from '@laf.ui/react'

export const ConnectBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})

export const ConnectItem = styled(Box, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '@sm': {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'inherit',
    gap: '$4',

    '& p': {
      textAlign: 'center',
    },
  },
})

export const AuthError = styled(Text, {
  color: '#f75a68',
})
