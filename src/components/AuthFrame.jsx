import React from 'react'
import { Typography, Stack, Box, Avatar } from '@mui/material'

import logo from '../images/logo.png'

function AuthFrame ({ children }) {
  return (
    <Box
      sx={{
        marginTop: '30px',
        height: '90vh',
        // width: '500px'
      }}
    >
      <Stack alignItems={'center'} spacing={2}>
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          direction={{ xs: 'column', md: 'row' }}
          spacing={1}
        >
          <Typography variant='h1' fontSize='1.3rem'>
            Welcome to VG-Tweets
          </Typography>
          <Avatar alt='VG Tweets' variant='square' src={logo} sx={{ width: 40 }} />
          <Typography variant='h1' fontSize='1.3rem'>
            Microblogging web-app
          </Typography>
        </Stack>
        <Box
          sx={{
            width: {xs: '90%', md: '500px'}
            // height: '700px'
          }}
        >
          {children}
        </Box>
      </Stack>
    </Box>
  )
}

export default AuthFrame
