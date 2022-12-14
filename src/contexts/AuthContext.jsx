import React from 'react'
import { useEffect } from 'react'
import { createContext, useState } from 'react'
import authenticator from '../utils/Authenticator'
import userStore from '../utils/userStore'

const AuthContext = createContext()

function AuthContextProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState({
    userData: null,
    isUserRetrieved: false
  })
  const [users, setUsers] = useState({
    users: [],
    isFinishedLoading: false
  })
  
  const loadUsers = async () => {
    const storedUsers = await userStore.getAll()
    if (storedUsers.isFinishedLoading) {
      setUsers(storedUsers.users)
    }
  }

  useEffect(() => {
    console.log('authContext init')
    /* ACTIVATE OBSERVER THAT UPDATES currentUser ON USER LOGIN/LOGOUT */
    authenticator.updateCurrentUser(setCurrentUser)

    loadUsers()
  }, [])

  const getUserNameFromUid = (userUid) => {
    const matchingUser = users.find(user => user.uid === userUid)
    // console.log('matchingUser=', matchingUser)
    return matchingUser.displayName
  }


  return (
    <AuthContext.Provider value={{ currentUser, users, getUserNameFromUid }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
