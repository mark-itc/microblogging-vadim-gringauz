import React from 'react'
import { useContext, useEffect, useState, useRef, useCallback } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import Tweet from './Tweet'
import { TweetsContext } from '../contexts/TweetsContext'
import { UsersContext } from '../contexts/UsersContext'
import tweetStore from '../utils/TweetStore'
import './TweetsList.css'

function TweetsList () {
  const { tweets, setTweets, isLoading } = useContext(TweetsContext)
  const batchSize = 10
  const [currentLimit, setCurrentLimit] = useState(10)
  const getCurrentLimit = () => currentLimit
  const [isReachedLimit, setIsReachedLimit] = useState(false)
  const [totalTweetCount, setTotalTweetCount] = useState(100)

  //* WHEN LAST TWEET VIEWED -> SHOW MORE TWEETS (THANK YOU "Web Dev Simplified" ❤)
  const observer = useRef()
  const lastTweetDivRef = useCallback(
    element => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !isReachedLimit) {
          setCurrentLimit(prevValue => {
            return prevValue + 10
          })
        }
      })
      if (element) observer.current.observe(element)
    },
    [isLoading, isReachedLimit]
  )

  const { getUserFromUid } = useContext(UsersContext)

  useEffect(() => {
    loadMoreTweets()
  }, [currentLimit]) // eslint-disable-line

  const getTotalTweetCount = async () =>
    setTotalTweetCount(await tweetStore.countTweets())

  let unsubscribeTweets = () => {}
  const getTweetsRealTime = async () => {
    unsubscribeTweets = await tweetStore.getTweetsRealTime(
      setTweets,
      getCurrentLimit,
      setIsReachedLimit
    )
  }
  useEffect(() => {
    //* SUBSCRIBING FOR REAL-TIME UPDATE WHEN NEW TWEET ADDED TO COLLECTION
    getTweetsRealTime()

    setCurrentLimit(10)
    setIsReachedLimit(false)

    return () => {
      //* UNSUBSCRIBING REAL-TIME UPDATES
      unsubscribeTweets()
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    getTotalTweetCount()
  }, [tweets])

  const loadMoreTweets = async () => {
    //* NO NEED TO GET TWEETS AGAIN
    if (isReachedLimit) return

    //* LAST BATCH, NO MORE PAGINATATION!
    if (currentLimit > totalTweetCount) setIsReachedLimit(true)

    //* GET THE NEXT [batchSize] TWEETS AND ADD TO STATE
    const tweetsToAdd = await tweetStore.getTweets(
      currentLimit + 1 - batchSize,
      batchSize
    )
    setTweets([...tweets, ...tweetsToAdd])
  }

  return (
    <div className='TweetsList' onScroll={loadMoreTweets}>
      <div className='loader'>
        <ClipLoader color={'white'} loading={isLoading} size={100} />
      </div>
      {tweets?.map((tweet, index) => {
        const { displayName, avatar } = getUserFromUid(tweet.userUid)
        if (tweets.length === index + 1) {
          return (
            <Tweet
              key={tweet.id}
              tweet={tweet}
              displayName={displayName}
              avatar={avatar}
            />
          )
        }
        return (
          <div ref={lastTweetDivRef}>
            <Tweet
              key={tweet.id}
              tweet={tweet}
              displayName={displayName}
              avatar={avatar}
            />
          </div>
        )
      })}
    </div>
  )
}

export default TweetsList
