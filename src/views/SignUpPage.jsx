import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from '@mui/material'
import { AuthContext } from '../contexts/AuthContext'
import AuthFrame from '../components/AuthFrame'
import SignUpForm from '../components/SignUpForm'

function SignUpPage () {
  const { currentUser } = useContext(AuthContext)
  const { userData, isUserRetrieved } = currentUser

  return (
    <Container>
      {isUserRetrieved &&
        (userData ? (
          <Navigate to={'/home'} />
        ) : (
          <AuthFrame>
            <SignUpForm />
          </AuthFrame>
        ))}
    </Container>
  )
}

export default SignUpPage
