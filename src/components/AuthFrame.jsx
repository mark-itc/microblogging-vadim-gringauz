import React from 'react'
import logo from '../images/logo.png'
import './AuthFrame.css'

function AuthFrame ({ children }) {
  return (
    <div className='AuthFrame'>
      <div className='title'>
        <span>Welcome to VG-Tweets</span>
        <img src={logo} alt='logo' />
        <span>Microblogging web-app</span>
      </div>
      <div className='current-form'>{children}</div>
    </div>
  )
}

export default AuthFrame
