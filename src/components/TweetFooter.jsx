import React from 'react'
import { Stack, IconButton, Tooltip, Checkbox } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded'

function TweetFooter () {
  return (
    <Stack direction='row' spacing={10} justifyContent='center'>
      <Tooltip title='Not functional yet'>
        <Checkbox icon={<FavoriteBorderIcon color='primary' />} checkedIcon={<Favorite />} />
      </Tooltip>
      <Tooltip title='Not functional yet'>
        <IconButton color='primary'>
          <ShareIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Not functional yet'>
        <IconButton color='primary'>
          <FormatQuoteRoundedIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

export default TweetFooter
