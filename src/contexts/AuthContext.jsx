import React from 'react'
import { useEffect } from 'react'
import { createContext, useState } from 'react'
import localforage from 'localforage'

const AuthContext = createContext()

function AuthContextProvider ({ children }) {
  const [userName, setUserName] = useState({value: '',loaded: false})

  useEffect(() => {
    localforage.setItem('user-name', userName)
  }, [userName])
  


  const loadAuth = async () => {
    const userStored = await localforage.getItem('user-name')
    if (userStored) {
      setUserName({...userStored, loaded: true})
      return
    }
    setUserName({value: '', loaded: true})
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