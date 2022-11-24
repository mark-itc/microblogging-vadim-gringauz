import React from 'react'
import { useEffect } from 'react'
import { createContext, useState } from 'react'
import localforage from 'localforage'

const AuthContext = createContext()

function AuthContextProvider ({ children }) {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    localforage.setItem('user-name', userName)
  }, [userName])
  


  const loadAuth = async () => {
    const userStored = await localforage.getItem('user-name')
    // console.log('creds=', userStored);
    userStored && setUserName(userStored)
  }

  useEffect(() => {
    loadAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ userName, setUserName }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }