import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'

function PrivateRoute () {
  const { currentUser } = useContext(AuthContext)
  const { userData, isUserRetrieved } = currentUser
  console.log('currentUser from route= ', currentUser)

  useEffect(() => {
    console.log('new currentUser', currentUser)
  }, [currentUser])

  return (
    <>
      {isUserRetrieved &&
        (userData ? (
          <>
            <Navbar />
            <Outlet />
          </>
        ) : (
          <>
            <Navigate to={'/sign-in'} />
          </>
        ))}
    </>
  )
}

export default PrivateRoute
