import React from 'react'
import { Button } from '@mui/material'
import googleLogo from '../images/google.svg'
import authenticator from '../utils/Authenticator'

function GoogleSignInButton ({ customText = 'Google' }) {
  const handleClick = async () => {
    await authenticator.signInWithGoogle()
  }

  return (
    <Button
      color='secondary'
      variant='contained'
      onClick={handleClick}
      sx={{
        width: '100%',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px'
      }}
    >
      <img src={googleLogo} alt='' height={'100%'} />
      <span>{customText}</span>
    </Button>
  )
}

export default GoogleSignInButton
