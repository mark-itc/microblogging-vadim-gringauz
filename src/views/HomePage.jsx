import React from 'react'
import { Container, Stack, Box } from '@mui/material'
import CreateTweet from '../components/CreateTweet'
import TweetsList from '../components/TweetsList'
import UserDashboard from '../components/UserDashboard'
import SearchTweets from '../components/SearchTweets'


function HomePage () {
  return (
    <Container>
      <Stack
        justifyContent={'space-between'}
        direction={'row'}
        spacing={{md: 2}}
        width={'100%'}
      >
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, width: '200px' }}>
          <UserDashboard />
        </Box>
        <Stack spacing={0} width={{xs: '100%', sm: '100%', md: '600px'}} >
          <CreateTweet />
          <TweetsList />
        </Stack>
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, width: '200px' }}>
          <SearchTweets />
        </Box>
      </Stack>
    </Container>
  )
}

export default HomePage
