import React from 'react'
import './Alert.css'

function Alert ({ isOn, message }) {
  return <>{isOn && <div className='Alert'>{message}</div>}</>
}

export default Alert
