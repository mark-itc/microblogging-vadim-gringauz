import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import AuthFrame from '../components/AuthFrame'
import SignInForm from '../components/SignInForm'
import './SignInPage.css'

function SignInPage () {
  const { currentUser } = useContext(AuthContext)
  const { userData, isUserRetrieved } = currentUser

  return (
    <div className='SignInPage'>
      {isUserRetrieved &&
        (userData ? (
          <Navigate to={'/home'} />
        ) : (
          <AuthFrame>
            <SignInForm />
          </AuthFrame>
        ))}
    </div>
  )
}

export default SignInPage
