import React from 'react'
import { useContext } from 'react'
import { CircularProgress } from '@mui/material'
import Alert from '@mui/material/Alert'
import { UsersContext } from '../contexts/UsersContext'

function DataLoader ({ children }) {
  const { signedUser } = useContext(UsersContext)
  //! COMPONENT VERIFIES ALL USERS DATA AND SIGNED-IN USER DATA ARE LOADED FROM SERVER
  //! signedUser.isLoaded = true ONLY IF AND AFTER users IS LOADED
  return (
    <>
      {signedUser.isLoaded ? (
        signedUser.uid ? (
          children
        ) : (
          <Alert variant='filled' severity='error'>
            Error loading signed user
          </Alert>
        )
      ) : (
        <CircularProgress />
      )}
    </>
  )
}

export default DataLoader
