import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Divider
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import LaunchIcon from '@mui/icons-material/Launch'
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
  color: #6c757d;
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
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Stack
      direction='row'
      spacing={2}
      justifyContent='space-between'
      alignItems={'center'}
    >
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
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='tweet-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem
          onClick={() => navigate(`/tweet/${tweet.id}`)}
          sx={{ gap: '10px' }}
        >
          <LaunchIcon />
          Open
        </MenuItem>
        <Tooltip title='Not functional yet'>
          <MenuItem onClick={handleClose} sx={{ gap: '10px' }}>
            <PlaylistAddIcon />
            Follow {displayName ? displayName : <>empty display name</>}
          </MenuItem>
        </Tooltip>
        <Divider sx={{ my: 0.5 }} />
        <Tooltip title='Not functional yet'>
          <MenuItem onClick={handleClose} sx={{ gap: '10px' }}>
            <EditIcon />
            Edit
          </MenuItem>
        </Tooltip>
        <Tooltip title='Not functional yet'>
          <MenuItem onClick={handleClose} sx={{ gap: '10px' }}>
            <DeleteIcon />
            Delete
          </MenuItem>
        </Tooltip>
      </Menu>
    </Stack>
  )
}

export default TweetHeader
