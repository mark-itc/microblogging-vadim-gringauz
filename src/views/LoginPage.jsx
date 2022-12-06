import React from 'react'
import logo from '../images/logo.png'
import googleLogo from '../images/google.svg'
import './LoginPage.css'

export default function LoginPage () {
  const handleSubmit = e => {
    e.preventDefault()
    console.log('login!')
  }

  return (
    <div className='LoginPage'>
      <div className='login-container'>
        <div className='header'>
          <span>Welcome to VG-Tweets</span>
          <img src={logo} alt='logo' />
          <span>Microblogging web-app</span>
        </div>
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
    </div>
  )
}
