import React from 'react'
import logo from '../images/logo.png'

function Logo ({ size }) {
  return <img src={logo} alt='logo' style={{ width: `${size}px`, height: `${size}px` }} />
}

export default Logo
