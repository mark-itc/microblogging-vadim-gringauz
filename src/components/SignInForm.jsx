import React from 'react'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import authenticator from '../utils/Authenticator'
import Alert from './Alert'
import googleLogo from '../images/google.svg'
import './SignInForm.css'

function SignInForm () {
  const emailInputBox = useRef()
  const passwordInputBox = useRef()
  const [authAlertMsg, setAuthAlertMsg] = useState('')
  const [isAlertOn, setIsAlertOn] = useState(false)
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  // const email = emailInputBox.current.value
  // const password = passwordInputBox.current.value

  const testUser = {
    email: 'vadim2@gmail.com',
    password: '1234567'
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('sign in!')
    console.log('emailInputBox', emailInputBox.current.value)
    console.log('passwordInputBox', passwordInputBox.current.value)
    const result = await authenticator.signIn({
      email: emailInputBox.current.value,
      password: passwordInputBox.current.value
    })
    console.log('result of sign in:', result)
    if (typeof result !== Object) {
      setIsAlertOn(true)
      setAuthAlertMsg(result)
      emailInputBox.current.value = ''
      passwordInputBox.current.value = ''
      setIsSubmitEnabled(false)
    }
  }

  const checkIfInputsNotEmpty = () => {
    setIsAlertOn(false)
    setAuthAlertMsg('')
    setIsSubmitEnabled(
      emailInputBox.current.value.length !== 0 &&
        passwordInputBox.current.value.length !== 0
    )
  }

  const togglePasswordType = () => {
    if (passwordType === 'password') setPasswordType('text')
    if (passwordType === 'text') setPasswordType('password')
  }

  return (
    <div className='SignInForm'>
      <form action='' onSubmit={handleSubmit}>
        <h3>Sign in to start tweeting</h3>
        <button type='button' className='google'>
          <img src={googleLogo} alt='' />
          <span>Sign in With Google</span>
        </button>
        <label htmlFor='email'>Email address</label>
        <input
          id='email'
          type='text'
          onChange={checkIfInputsNotEmpty}
          ref={emailInputBox}
          autoFocus
        />
        <label htmlFor='password'>Password</label>
        <div className='password-input'>
          <input
            id='password'
            type={passwordType}
            onChange={checkIfInputsNotEmpty}
            autocomplete='current-password'
            ref={passwordInputBox}
          />
          <span onClick={togglePasswordType}>
            <FontAwesomeIcon icon={faEye} />
          </span>
        </div>
        <button type='submit' disabled={!isSubmitEnabled}>
          Sign in
        </button>
      </form>
      <Alert isOn={isAlertOn} message={authAlertMsg} />
      <div className='signup'>
        <span>New User?</span>
        <a href=''>Sign up here</a>
      </div>
    </div>
  )
}

export default SignInForm
