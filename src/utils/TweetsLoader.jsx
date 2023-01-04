import React from 'react'
import { useContext } from 'react'
import { CircularProgress } from '@mui/material'
import { Alert } from '@mui/material'
import { TweetsContext } from '../contexts/TweetsContext'

function TweetsLoader ({ children }) {
  const { tweets } = useContext(TweetsContext)

  return (
    <>
      {tweets === 'not loaded yet' ? (
        <CircularProgress />
      ) : tweets.length > 0 ? (
        children
      ) : (
        <Alert variant='filled' severity='info'>
          No tweets were loaded
        </Alert>
      )}
    </>
  )
}

export default TweetsLoader
