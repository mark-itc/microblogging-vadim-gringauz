import React from 'react'
import { Stack, IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded'

function TweetFooter () {
  return (
    <Stack direction='row' spacing={10} justifyContent='center'>
      <IconButton color='primary'>
        <FavoriteBorderIcon fontSize='small' />
      </IconButton>
      <IconButton color='primary'>
        <ShareIcon fontSize='small' />
      </IconButton>
      <IconButton color='primary'>
        <FormatQuoteRoundedIcon fontSize='small' />
      </IconButton>
    </Stack>
  )
}

export default TweetFooter