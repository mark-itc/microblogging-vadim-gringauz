import React from 'react'
import { useContext } from 'react'
import { createContext, useState, useEffect } from 'react'
import userStore from '../utils/UserStore'
import { AuthContext } from './AuthContext'

const UsersContext = createContext()

function UsersContextProvider ({ children }) {
  const [users, setUsers] = useState('before-loading')
  const [signedUser, setSignedUser] = useState()
  const { currentUser } = useContext(AuthContext)

  const getAllUsersFromServer = async () => {
    setUsers(await userStore.loadUsers())
  }

  const loadDataFromServer = async () => {
    await getAllUsersFromServer()
    // if (currentUser.isUserRetrieved) {
    //   setSignedUser(getUserFromUid(currentUser.userData.uid))
    // }
  }

  useEffect(() => {
    loadDataFromServer()
  }, [currentUser])

  useEffect(() => {
    if (users === 'before-loading') return
    setSignedUser(getUserFromUid(currentUser.userData.uid))
  }, [users])

  useEffect(() => {
    console.log('signedUser', signedUser)
  }, [signedUser])

  const getUserFromUid = userUid => {
    const matchingUser = users.find(user => user.uid === userUid)
    if (matchingUser) return matchingUser
    return null
  }

  return (
    <UsersContext.Provider value={{ users, setUsers, getUserFromUid, signedUser }}>
      {children}
    </UsersContext.Provider>
  )
}

export { UsersContext, UsersContextProvider }
