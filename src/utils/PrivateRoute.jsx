import React from 'react'
import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function PrivateRoute ({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser } = useContext(AuthContext)

  /* GIVES 0.5 SEC FOR GETTING currentUser FROM SERVER BEFORE RENDER
     OTHERWISE currentUser=NULL AND IT NAVIGATES TO SIGN-IN EACH TIME */
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [currentUser])

  return (
    <>
      {!isLoading &&
        (currentUser ? (
          <>
            <Outlet />
          </>
        ) : (
          <Navigate to={'sign-in'} />
        ))}
    </>
  )
}

export default PrivateRoute
