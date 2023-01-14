import React from 'react'
import styled from 'styled-components'
import {
  Stack,
  Typography,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  TextField,
  Tooltip
} from '@mui/material'

const SearchTweetsStyle = styled.div`
  width: 100%;
  background-color: var(--bg-secondary);
  border-radius: 6px;
  padding: 5px;
`

function SearchTweets() {
  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <SearchTweetsStyle>
      <Stack spacing={2} justifyContent={'flex-start'} alignItems={'center'}>
        <Typography fontSize={'1.2rem'} color='primary' fontWeight={'bold'} >
          Search Tweets
        </Typography>
        <Tooltip title='Not functional yet'>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <TextField placeholder='' variant="outlined" size='small' />
              <FormLabel id='search' sx={{ mt: '10px' }} >Search by:</FormLabel>
              <RadioGroup defaultValue='Users' name='search-options'>
                <FormControlLabel
                  value='Users'
                  control={<Radio />}
                  label='Users'
                />
                <FormControlLabel
                  value='Tweets'
                  control={<Radio />}
                  label='Tweets'
                />
              </RadioGroup>
              <Button type='submit' variant='contained' sx={{ mt: '10px' }} >
                Search
              </Button>
            </FormControl>
          </form>
        </Tooltip>
      </Stack>
    </SearchTweetsStyle>
  )
}

export default SearchTweets
