import React from 'react'
import { Stack } from '@mui/material'
import styled from 'styled-components'

const TweetContent = styled.p`
  font-size: 1rem;
  text-align: left;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`

function TweetBody ({ content }) {
  return (
    <Stack direction='row' spacing={2} justifyContent='left'>
      <TweetContent>{content ? content : <>empty content</>}</TweetContent>
    </Stack>
  )
}

export default TweetBody
