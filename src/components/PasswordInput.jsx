import React from 'react'
import { useState, useId } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import './PasswordInput.css'

function PasswordInput ({ customLabel = 'Password', password, setPassword }) {
  const [inputType, setInputType] = useState('password')
  const id = useId()

  const toggleInputType = () => {
    if (inputType === 'password') setInputType('text')
    if (inputType === 'text') setInputType('password')
  }
  return (
    <div className='PasswordInput'>
      <label htmlFor={id} >{customLabel}</label>
      <div className='only-input'>
        <input
          id={id}
          type={inputType}
          onChange={e => setPassword(e.target.value)}
          autoComplete='current-password'
          value={password}
          min='6'
        />
        {password.replaceAll(' ', '').length !== 0 && (
          <span onClick={toggleInputType} className='icon'>
            <FontAwesomeIcon icon={faEye} />
          </span>
        )}
      </div>
    </div>
  )
}

export default PasswordInput
