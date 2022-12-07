import React from 'react'
import { useNavigate } from 'react-router-dom'
import authenticator from '../utils/Authenticator'
import googleLogo from '../images/google.svg'
import './LoginForm.css'

function LoginForm () {
  const navigate = useNavigate()

  const testUser = {
    email: 'vadim2@gmail.com',
    password: '1234567'
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('login!')
    authenticator.login(testUser)
    navigate('/home')
  }
  return (
    <div className='LoginForm'>
    <form action='' onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      <button type='button' className='google'>
        <img src={googleLogo} alt='' />
        <span>Sign In With Google</span>
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

export default LoginForm
