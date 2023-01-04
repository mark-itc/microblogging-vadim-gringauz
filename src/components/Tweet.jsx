import React from 'react'
import { Stack } from '@mui/material'
import styled from 'styled-components'
import TweetHeader from './TweetHeader'
import TweetBody from './TweetBody'
import TweetFooter from './TweetFooter'

const TweetStyle = styled.div`
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.8rem;
  border: 1px black solid;
  border-radius: 6px;
  margin-bottom: 20px;
  width: 100%;
  min-height: 150px;
  padding: 5px 15px;

  @media screen and (width < 600px) {
    width: 100%;
    border-radius: 0;
    border: 0;
  }
`

function Tweet ({ tweet, displayName, avatar }) {
  const { content, date } = tweet

  return (
    <TweetStyle>
      <Stack spacing={1}>
        <TweetHeader
          displayName={displayName}
          avatar={avatar}
          tweet={tweet}
          date={date}
        />
        <TweetBody content={content} />
        <TweetFooter />
      </Stack>
    </TweetStyle>
  )
}

export default Tweet
