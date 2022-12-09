import React from 'react'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import authenticator from '../utils/Authenticator'
import googleLogo from '../images/google.svg'
import './SignInForm.css'

function SignInForm () {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const testUser = {
    email: 'vadim2@gmail.com',
    password: '1234567'
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('sign in!')
    authenticator.signIn(testUser)
  }

  useEffect(() => {
    if (currentUser) {
      navigate('/home')
    }
  }, [currentUser])

  return (
    <div className='SignInForm'>
      <form action='' onSubmit={handleSubmit}>
        <h3>Sign in to start tweeting</h3>
        <button type='button' className='google'>
          <img src={googleLogo} alt='' />
          <span>Sign in With Google</span>
        </button>
        <label htmlFor=''>Username or email address</label>
        <input type='text' autoFocus />
        <label htmlFor=''>Password</label>
        <input type='password' />
        <button type='submit'>Sign in</button>
      </form>
      <div className='signup'>
        <span>New User?</span>
        <a href=''>Sign up here</a>
      </div>
    </div>
  )
}

export default SignInForm
