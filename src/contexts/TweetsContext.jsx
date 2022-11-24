import React from 'react'
import { createContext, useState } from 'react'

const TweetsContext = createContext()

function TweetsContextProvider ({ children }) {
  const [tweets, setTweets] = useState([])
  const [isLoading, setIsLoading] = useState(false);


  return (
    <TweetsContext.Provider value={{ tweets, setTweets, isLoading, setIsLoading }}>
      {children}
    </TweetsContext.Provider>
  )
}

export { TweetsContext, TweetsContextProvider }