import React from 'react'
import LoginForm from '../components/LoginForm'
import logo from '../images/logo.png'
import './LoginPage.css'

function LoginPage () {
  return (
    <div className='LoginPage'>
      <div className='header'>
        <span>Welcome to VG-Tweets</span>
        <img src={logo} alt='logo' />
        <span>Microblogging web-app</span>
      </div>
      <LoginForm />
    </div>
  )
}

export default LoginPage
