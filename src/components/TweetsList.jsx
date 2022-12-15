import React from 'react'
import { useContext, useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { sort } from 'fast-sort'
import Tweet from './Tweet'
import { TweetsContext } from '../contexts/TweetsContext'
import { UsersContext } from '../contexts/UsersContext'
import { REFRESH_RATE } from '../utils/globals'
import tweetServer from '../utils/TweetServer'
import './TweetsList.css'
import { AuthContext } from '../contexts/AuthContext'

function TweetsList () {
  const { tweets, setTweets, isLoading, setIsLoading } =
    useContext(TweetsContext)
  const sortedTweets = sort(tweets).desc(tweet => tweet.date)

  const { getUserFromUid } = useContext(UsersContext)

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
    <div className='TweetsList'>
      <ClipLoader color={'white'} loading={isLoading} size={100} />
      {sortedTweets?.map(tweet => {
        const { displayName, avatar } = getUserFromUid(
          tweet.userUid
        )
        return (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            displayName={displayName}
            avatar={avatar}
          />
        )
      })}
    </div>
  )
}

export default TweetsList
