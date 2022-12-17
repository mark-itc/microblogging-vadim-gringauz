import React from 'react'
import { useContext, useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import Tweet from './Tweet'
import { TweetsContext } from '../contexts/TweetsContext'
import { UsersContext } from '../contexts/UsersContext'
import tweetStore from '../utils/TweetStore'
import './TweetsList.css'

function TweetsList () {
  const { tweets, setTweets, isLoading } =
    useContext(TweetsContext)
  const [currentLimit, setCurrentLimit] = useState(10)

  const { getUserFromUid } = useContext(UsersContext)

const onScroll = () => {
  console.log('scrolling??')
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    console.log('bottom of page?')
    // loadMoreTweets()
  }
}

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    //* SUBSCRIBING FOR REAL-TIME UPDATE WHEN NEW TWEET ADDED TO COLLECTION
    const unsubscribeTweets = tweetStore.getTweetsRealTime(
      setTweets,
      currentLimit
    )

    //* UNSUBSCRIBING
    // return unsubscribeTweets()
    console.log(unsubscribeTweets) 
  }, []) // eslint-disable-line

  const loadMoreTweets = () => {
    setCurrentLimit(currentLimit + 10)
  }

  return (
    <div className='TweetsList' onScroll={loadMoreTweets}>
      <ClipLoader color={'white'} loading={isLoading} size={100} />
      {tweets?.map(tweet => {
        const { displayName, avatar } = getUserFromUid(tweet.userUid)
        return (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            displayName={displayName}
            avatar={avatar}
          />
        )
      })}
      <button onClick={loadMoreTweets}>more</button>
    </div>
  )
}

export default TweetsList
