import React from 'react'
import googleLogo from '../images/google.svg'
import authenticator from '../utils/Authenticator'
import './GoogleSignInButton.css'

function GoogleSignInButton ({ customText = 'Sign in With Google' }) {
  const handleClick = async () => {
    await authenticator.signInWithGoogle()
  }

  return (
    <button type='button' className='GoogleSignInButton' onClick={handleClick}>
      <img src={googleLogo} alt='' />
      <span>{customText}</span>
    </button>
  )
}

export default GoogleSignInButton
