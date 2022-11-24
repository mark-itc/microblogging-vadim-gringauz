import React from 'react'
import { createContext, useState, useEffect, CSSProperties } from 'react'
import localforage from 'localforage'
import { SERVER_URL } from '../globals'

const TweetsContext = createContext()

function TweetsContextProvider ({ children }) {
  const [tweets, setTweets] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFromServer = async () => {
      try {
        setIsLoading(true)
        console.log('fetching data...');
        const response = await fetch(SERVER_URL)
        const data = await response.json()
        const fetchedTweets = data.tweets
        setTweets(fetchedTweets)
      } catch(error) {
        console.log('error loading tweets:', error);
      } finally {
        console.log('Done fetching');
        setIsLoading(false)
      }
    }
    getFromServer()
  }, [])

  const clearStorage = () => setTweets([])

  return (
    <TweetsContext.Provider value={{ tweets, setTweets, clearStorage, isLoading }}>
      {children}
    </TweetsContext.Provider>
  )
}

export { TweetsContext, TweetsContextProvider }

// const loadFromStorage = async () => {
//   const tweetsFromStorage = await localforage.getItem('tweets')
//   if (tweetsFromStorage) setTweets(tweetsFromStorage)
//   console.log('loaded tweets', tweets)
// }

// loadFromStorage()
// localforage.setItem('tweets', tweets)