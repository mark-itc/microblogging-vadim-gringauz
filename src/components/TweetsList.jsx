import React from 'react'
import { useContext, useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { sort } from 'fast-sort'
import Tweet from './Tweet'
import { TweetsContext } from '../contexts/TweetsContext'
import { SERVER_URL, REFRESH_RATE } from '../globals'

function TweetsList () {
  const { tweets, setTweets, isLoading, setIsLoading } = useContext(
    TweetsContext
  )

  const sortedTweets = sort(tweets).desc(tweet => new Date(tweet.date))

  const getFromServer = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(SERVER_URL)
      const data = await response.json()
      const fetchedTweets = data.tweets
      setTweets(fetchedTweets)
    } catch (error) {
      console.log('error loading tweets:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getFromServer() // eslint-disable-line
    const interval = setInterval(getFromServer, REFRESH_RATE)
    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <ClipLoader color={'white'} loading={isLoading} size={100} />
      {sortedTweets?.map((tweet, index) => (
        <Tweet key={'tweet-' + index} tweet={tweet} />
      ))}
    </>
  )
}

export default TweetsList
