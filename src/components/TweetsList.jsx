import React from 'react'
import { useContext, useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { sort } from 'fast-sort'
import Tweet from './Tweet'
import { TweetsContext } from '../contexts/TweetsContext'
import { REFRESH_RATE } from '../utils/globals'
import tweetServer from '../utils/TweetServer'

function TweetsList () {
  const { tweets, setTweets, isLoading, setIsLoading } =
    useContext(TweetsContext)

  const sortedTweets = sort(tweets).desc(tweet => tweet.date)

  const getFromServer = async () => {
    try {
      setIsLoading(true)
      setTweets(await tweetServer.getAll())
    } catch (error) {
      console.log('error loading tweets:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getFromServer() // eslint-disable-line
    const interval = setInterval(getFromServer, REFRESH_RATE)
    return () => clearInterval(interval)
  }, []) // eslint-disable-line

  return (
    <>
      <ClipLoader color={'white'} loading={isLoading} size={100} />
      {sortedTweets?.map((tweet, index) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </>
  )
}

export default TweetsList
