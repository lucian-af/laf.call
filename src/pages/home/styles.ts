import { styled, Heading, Text } from "@laf.ui/react";

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  marginLeft: 'auto',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',

  '@sm': {
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 $4'
  }
})

export const Main = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  [`${Heading}`]: {
    '@sm': {
      fontSize: '$6xl'
    }
  },

  [`${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
  }
})

export const Preview = styled('div', {
  overflow: 'hidden',
  paddingRight: '$8',

  '@sm': {
    display: 'none'
  }
})