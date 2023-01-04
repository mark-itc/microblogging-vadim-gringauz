import React from 'react'
import { createContext, useState, useEffect } from 'react'

const TweetsContext = createContext()

function TweetsContextProvider ({ children }) {
  const [tweets, setTweets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (tweets.length > 0) setIsLoading(false)
    
  }, [tweets])

  return (
    <TweetsContext.Provider
      value={{ tweets, setTweets, isLoading, setIsLoading }}
    >
      {children}
    </TweetsContext.Provider>
  )
}

export { TweetsContext, TweetsContextProvider }