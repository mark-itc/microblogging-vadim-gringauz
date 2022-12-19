import React from 'react'
import { useContext, createContext, useState, useEffect } from 'react'
<<<<<<< Updated upstream
import userStore from '../utils/UserStore'
=======
import userStore from '../utils/UserStore.js'
>>>>>>> Stashed changes
import { AuthContext } from './AuthContext'

const UsersContext = createContext()

function UsersContextProvider ({ children }) {
  const [users, setUsers] = useState('before-loading')
  const [signedUser, setSignedUser] = useState()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    //* SUBSCRIBING FOR REAL-TIME UPDATE WHEN NEW USER ADDED TO COLLECTION
    const unsubscribeUsers = userStore.getUsersRealTime(setUsers)

    //* UNSUBSCRIBING
    return unsubscribeUsers
  }, [])

  useEffect(() => {
    if (users === 'before-loading') return
    setSignedUser(getUserFromUid(currentUser.userData.uid))
  }, [users]) // eslint-disable-line

  useEffect(() => {
    console.log('signedUser', signedUser)
  }, [signedUser])

  const getUserFromUid = userUid => {
    const matchingUser = users.find(user => user.uid === userUid)
    if (matchingUser) return matchingUser
    return null
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        getUserFromUid,
        signedUser
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export { UsersContext, UsersContextProvider }
