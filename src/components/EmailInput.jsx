import React from 'react'
import './EmailInput.css'

function EmailInput ({ customLabel = 'Email address', email, setEmail }) {
  return (
    <div className='EmailInput'>
      <label htmlFor='email'>
        {customLabel}
      </label>
      <input
        id='email'
        type='text'
        onChange={e => setEmail(e.target.value)}
        value={email}
        placeholder='Example@domain.com'
        autoFocus
        autoComplete="email"
        maxLength={25}
        pattern='^\S+@\S+$'
        title='Must be an e-mail'
        required
      />
    </div>
  )
}
export default EmailInput
