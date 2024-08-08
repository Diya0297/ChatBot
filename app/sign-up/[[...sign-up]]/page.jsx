'use client'

import { SignUp } from '@clerk/nextjs'
import { Box, Typography } from '@mui/material'

export default function Page() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #f0f4f8, #e0e5e9)', // Light gradient background
        padding: '2rem',
      }}
    >
      <Typography
        variant='h3'
        component='h1'
        sx={{
          marginBottom: '2rem',
          color: '#00796b',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Subtle shadow for better readability
        }}
      >
        Sign Up
      </Typography>

      <SignUp />
    </Box>
  )
}
