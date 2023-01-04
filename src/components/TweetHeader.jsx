import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Stack, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import styled from 'styled-components'
import DateTimeDisplay from './DateTimeDisplay'
import CursorPointer from '../styled-components/CursorPointer'

const TweetDisplayName = styled.span`
    color: var(--text-secondary);
    font-style: italic;
    font-size: 1rem;
    font-weight: bold;
    overflow-wrap: break-word;
    justify-content: flex-start;
    display: flex;
    align-items: center;
    width: 40%;

    @media screen and (width < 600px) {
        font-size: 0.6rem;
    }
`

const TweetDate = styled.span`
    color: #6C757D;
    font-size: 0.6rem;
    overflow-wrap: break-word;
    justify-content: flex-start;
    display: flex;
    align-items: center;

    @media screen and (width < 600px) {
      font-size: 0.4rem;
    }
`

function TweetHeader ({ displayName, avatar, tweet, date }) {
  const navigate = useNavigate()

  return (
    <Stack direction='row' spacing={2} justifyContent='space-between' alignItems={'center'}>
      <CursorPointer>
        <Avatar
          alt={displayName}
          src={avatar}
          sx={{ width: 40, height: 40 }}
          onClick={() => navigate(`/profile/${tweet.userUid}`)}
        />
      </CursorPointer>
      <TweetDisplayName>
        {displayName ? displayName : <>empty display name</>}
      </TweetDisplayName>
      <TweetDate>
        {date ? <DateTimeDisplay timeStamp={date.toDate()} /> : <>empty date</>}
      </TweetDate>
      <MoreHorizIcon />
    </Stack>
  )
}

export default TweetHeader
