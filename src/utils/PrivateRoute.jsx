import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { useContext } from 'react'
import { TweetsContextProvider } from '../contexts/TweetsContext'
import { UsersContextProvider } from '../contexts/UsersContext'
import { AuthContext } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import DataLoader from './DataLoader'

function PrivateRoute () {
  const { currentUser } = useContext(AuthContext)
  const { userData, isUserRetrieved } = currentUser

  useEffect(() => {}, [currentUser])

  return (
    <>
      {isUserRetrieved &&
        (userData ? (
          <>
            <UsersContextProvider>
              <TweetsContextProvider>
                <DataLoader>
                  <Navbar />
                  <Box sx={{
                    width: '100%',
                    position: 'absolute',
                    top: '100px'
                  }}>
                    <Outlet />
                  </Box>
                </DataLoader>
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
