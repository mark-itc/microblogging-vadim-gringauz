import React from 'react'
import { useContext } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { sort } from 'fast-sort'
import Tweet from './Tweet'
import { TweetsContext } from '../contexts/TweetsContext'

function TweetsList ({}) {
  const { tweets, isLoading } = useContext(TweetsContext)

  const sortedTweets = sort(tweets).desc(tweet => new Date(tweet.date))

  return (
    <>
      <ClipLoader
        color={'white'}
        loading={isLoading}
        size={100}
      />
      {sortedTweets?.map((tweet, index) => (
        <Tweet key={'tweet-' + index} tweet={tweet} />
      ))}
    </>
  )
}

export default TweetsList
