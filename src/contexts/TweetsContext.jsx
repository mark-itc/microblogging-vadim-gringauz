import React from 'react'
import { useEffect } from 'react'
import { createContext, useState } from 'react'
import localforage from 'localforage'

const TweetsContext = createContext()

function TweetsContextProvider ({ children }) {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    localforage.setItem('tweets', tweets)
    console.log('saved tweets', tweets)
  }, [tweets])

  useEffect(() => {
    const loadFromStorage = async () => {
      const tweetsFromStorage = await localforage.getItem('tweets')
      if (tweetsFromStorage) setTweets(tweetsFromStorage)
      console.log('loaded tweets', tweets)
    }

    loadFromStorage()
  }, [])

  const clearStorage = () => setTweets([])

  return (
    <TweetsContext.Provider value={{ tweets, setTweets, clearStorage }}>
      {children}
    </TweetsContext.Provider>
  )
}

export { TweetsContext, TweetsContextProvider }
