import React from 'react'
import { useEffect } from 'react'
import { createContext, useState } from 'react'
import { onAuthStateChanged, displayName } from 'firebase/auth'
import authenticator from '../utils/Authenticator'

const AuthContext = createContext()

function AuthContextProvider ({ children }) {
  const [user, setUser] = useState()

  onAuthStateChanged(authenticator.auth, user => {
    if (user) {
      const uid = user.uid
      console.log('user', user.displayName)
      setUser(user)
    } else {
      setUser(null)
    }
  })
  // useEffect(() => {
  // }, [])


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
