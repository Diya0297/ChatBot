'use client'
// app/page.js (Homepage)

import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const handleStartChat = () => {
    router.push('/chat') // Navigate to the chat page
  }

  const handleLogin = () => {
    router.push('/sign-in') // Navigate to the login page
  }

  const handleRegister = () => {
    router.push('/sign-up') // Navigate to the registration page
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #e0f2f1, #b2dfdb)', // Light green gradient
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <Typography
        variant='h3'
        component='h1'
        sx={{
          marginBottom: '2rem',
          color: '#00796b',
          fontWeight: 'bold',
        }}
      >
        Welcome to ChatBot
      </Typography>

      <Typography
        variant='h5'
        component='h2'
        sx={{
          marginBottom: '2rem',
          color: '#00796b',
          fontWeight: 'medium',
        }}
      >
        Please SignIn or SignUp to store your chat history
      </Typography>
      <Stack spacing={2}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleStartChat}
          sx={{
            backgroundColor: '#004d40', // Dark teal
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: 'var(--border-radius)',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: '#00251a', // Darker teal on hover
            },
          }}
        >
          Start Chat
        </Button>
        <Stack direction='row' spacing={2} justifyContent='center'>
          <Button
            variant='outlined'
            onClick={handleLogin}
            sx={{
              borderColor: '#00796b',
              color: '#00796b',
              padding: '0.75rem 2rem',
              borderRadius: 'var(--border-radius)',
              fontWeight: 'bold',
              borderWidth: '2px',
              '&:hover': {
                backgroundColor: '#00796b',
                color: 'white',
              },
            }}
          >
            Sign In
          </Button>
          <Button
            variant='outlined'
            onClick={handleRegister}
            sx={{
              borderColor: '#00796b',
              color: '#00796b',
              padding: '0.75rem 2rem',
              borderRadius: 'var(--border-radius)',
              fontWeight: 'bold',
              borderWidth: '2px',
              '&:hover': {
                backgroundColor: '#00796b',
                color: 'white',
              },
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
