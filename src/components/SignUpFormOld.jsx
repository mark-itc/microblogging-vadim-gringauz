import React from 'react'
import { useState } from 'react'
import authenticator from '../utils/Authenticator'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import DisplayNameInput from './DisplayNameInput'
import Alert from './Alert'
import './SignUpForm.css'

function SignUpForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [authAlertMsg, setAuthAlertMsg] = useState('')
  const [isAlertOn, setIsAlertOn] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (password === password2) {
      const result = await authenticator.createNewUser({
        email: email,
        password: password,
        displayName: displayName
      })

      if (typeof result !== Object) {
        setIsAlertOn(true)
        console.log('result', result)
        switch (result) {
          case 'auth/email-already-in-use': {
            setAuthAlertMsg('Email already exists')
            break
          }
          default:
            setAuthAlertMsg('Error signing up')
        }
        setEmail('')
        setPassword('')
        setPassword2('')
        setDisplayName('')
      }
    } else {
      setIsAlertOn(true)
      setAuthAlertMsg('Passwords are not the same')
      setPassword('')
      setPassword2('')
    }
  }

  return (
    <div className='SignUpForm'>
      <form action='' onSubmit={handleSubmit}>
        <h4>Sign up</h4>
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <PasswordInput
          customLabel='Confirm password'
          password={password2}
          setPassword={setPassword2}
        />
        <DisplayNameInput
          displayName={displayName}
          setDisplayName={setDisplayName}
        />
        <button
          type='submit'
          disabled={
            email.replaceAll(' ', '').length === 0 ||
            password.replaceAll(' ', '').length === 0 ||
            password2.replaceAll(' ', '').length === 0
          }
        >
          Sign up
        </button>
      </form>
      <Alert isOn={isAlertOn} message={authAlertMsg} />
      <div className='signin-link'>
        <span>Already have an account?</span>
        <a href='/sign-in'>Sign in here</a>
      </div>
    </div>
  )
}

export default SignUpForm
