'use client'

// import styles from './page.module.css'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ChatMessage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the ChatBot. How can I assist you today?",
    },
  ])
  const [message, setMessage] = useState('')
  const router = useRouter()

  const sendMessage = async () => {
    if (!message.trim()) return // Prevent sending empty messages

    // Add user's message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])

    setMessage('')

    // Fetch response from OpenAI API
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: message }],
        }),
      })

      const data = await response.json()
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1]
        const otherMessages = prevMessages.slice(0, prevMessages.length - 1)
        return [
          ...otherMessages,
          { ...lastMessage, content: data }, // Append the assistant's response
        ]
      })
    } catch (error) {
      console.error('Error fetching response:', error)
    }
  }

  // Send the message to the server
  //   const response = fetch('/api/chat', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify([...messages, { role: 'user', content: message }]),
  //   }).then(async (res) => {
  //     const reader = res.body.getReader() // Get a reader to read the response body
  //     const decoder = new TextDecoder() // Create a decoder to decode the response text

  //     let result = ''
  //     // Function to process the text from the response
  //     return reader.read().then(function processText({ done, value }) {
  //       if (done) {
  //         return result
  //       }
  //       const text = decoder.decode(value || new Uint8Array(), { stream: true }) // Decode the text
  //       setMessages((messages) => {
  //         let lastMessage = messages[messages.length - 1] // Get the last message (assistant's placeholder)
  //         let otherMessages = messages.slice(0, messages.length - 1) // Get all other messages
  //         return [
  //           ...otherMessages,
  //           { ...lastMessage, content: lastMessage.content + text }, // Append the decoded text to the assistant's message
  //         ]
  //       })
  //       return reader.read().then(processText) // Continue reading the next chunk of the response
  //     })
  //   })
  // }

  const handleBack = () => {
    router.push('/') // Navigate back to the homepage
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        padding: '2rem',
        background: 'linear-gradient(to bottom, #f0f4f8, #e0e5e9)', // Light gradient background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '700px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <Button
          variant='outlined'
          onClick={handleBack}
          sx={{
            borderColor: '#00796b',
            color: '#00796b',
            borderRadius: 'var(--border-radius)',
            borderWidth: '2px',
            '&:hover': {
              backgroundColor: '#00796b',
              color: 'white',
            },
          }}
        >
          Back to Home
        </Button>
        <Typography
          variant='h4'
          component='h1'
          sx={{
            color: '#00796b',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Subtle shadow for better readability
          }}
        >
          ChatBot
        </Typography>
      </Box>
      <Stack
        direction='column'
        width={{ xs: '95%', sm: '600px', md: '700px' }} // Adjust width for better layout
        height='700px'
        borderRadius='var(--border-radius)'
        border='1px solid rgba(var(--callout-border-rgb), 0.3)'
        p={2}
        spacing={2}
        bgcolor='white' // Set the inside box background to white
        boxShadow={3}
      >
        <Stack
          direction='column'
          spacing={2}
          flexGrow={1}
          overflow='auto'
          maxHeight='100%'
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
              mb={1}
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? '#dbf4f8' // Light blue background for assistant messages
                    : 'rgb(174 240 147)' // Light green background for user messages
                }
                color='rgb(0, 0, 0)'
                borderRadius='var(--border-radius)'
                p={2}
                maxWidth='80%' // Limit the width for better readability
                wordBreak='break-word'
                boxShadow='inset 0 0 5px rgba(0, 0, 0, 0.1)'
              >
                <Typography variant='body1'>{message.content}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction='row' spacing={2} mt={2}>
          <TextField
            label='Type a message...'
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant='outlined'
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={sendMessage}
            disabled={!message.trim()} // Disable button if input is empty
            sx={{
              borderRadius: 'var(--border-radius)',
              backgroundColor: '#00796b', // Teal background for button
              color: 'white',
              '&:hover': {
                backgroundColor: '#004d40', // Darker teal on hover
              },
              padding: '0.75rem 1.5rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for better visibility
            }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
