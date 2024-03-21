import { Box, Text, styled } from '@laf.ui/react'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media(max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const TimePicker = styled('div', {
  borderLeft: '1px solid $gray600',
  padding: '$6 $6 0',
  overflowY: 'auto',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 280,

  '@media(max-width: 900px)': {
    borderTop: '1px solid $gray600',
    position: 'initial',
    display: 'block',
    width: '100%',
  },
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',
  textAlign: 'center',

  span: {
    color: '$gray200',
  },
})

export const TimePickerList = styled('div', {
  margin: '$3 auto',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@media(max-width: 900px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridAutoRows: '1fr',
  },
})

export const TimePickerItem = styled('button', {
  border: 0,
  color: '$gray100',
  backgroundColor: '$gray600',
  fontSize: '$sm',
  cursor: 'pointer',
  lineHeight: '$base',
  borderRadius: '$sm',
  padding: '$2 0',

  '@media(max-width: 900px)': {
    width: '100%',
    height: '100%',
    justifySelf: 'center',
  },

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'not-allowed',
    opacity: 0.4,
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$gray500',
  },
})
