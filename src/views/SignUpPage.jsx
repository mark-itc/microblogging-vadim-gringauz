import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import AuthFrame from '../components/AuthFrame'
import SignUpForm from '../components/SignUpForm'
import './SignUpPage.css'

function SignUpPage () {
  const { currentUser } = useContext(AuthContext)
  const { userData, isUserRetrieved } = currentUser

  return (
    <div className='SignUpPage'>
      {isUserRetrieved &&
        (userData ? (
          <Navigate to={'/home'} />
        ) : (
          <AuthFrame>
            <SignUpForm />
          </AuthFrame>
        ))}
    </div>
  )
}

export default SignUpPage
