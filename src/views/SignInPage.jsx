import React from 'react'
import AuthFrame from '../components/AuthFrame'
import SignInForm from '../components/SignInForm'

function SignInPage () {
  return (
    <div className='SignInPage'>
      <AuthFrame>
        <SignInForm />
      </AuthFrame>
    </div>
  )
}

export default SignInPage
