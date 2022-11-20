import React from 'react'
import { MAX_CHARS } from '../globals'
import './Alert.css'

function Alert() {
  return (
    <div className='Alert'>
      The tweet can't contain more than {MAX_CHARS} chars
    </div>
  )
}


export default Alert