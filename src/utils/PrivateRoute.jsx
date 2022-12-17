import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { TweetsContextProvider } from '../contexts/TweetsContext'
import { UsersContextProvider } from '../contexts/UsersContext'
import { AuthContext } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'

function PrivateRoute () {
  const { currentUser } = useContext(AuthContext)
  const { userData, isUserRetrieved } = currentUser

  useEffect(() => {
  }, [currentUser])

  return (
    <>
      {isUserRetrieved &&
        (userData ? (
          <>
            <UsersContextProvider>
              <TweetsContextProvider>
                <Navbar />
                <Outlet />
              </TweetsContextProvider>
            </UsersContextProvider>
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
