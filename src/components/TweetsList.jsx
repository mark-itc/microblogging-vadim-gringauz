import React from 'react'
import { useContext } from 'react'
import { sort } from 'fast-sort'
import Tweet from './Tweet'
import { TweetsContext } from '../contexts/TweetsContext'

function TweetsList ({}) {
  const { tweets, setTweets } = useContext(TweetsContext)

  const sortedTweets = sort(tweets).desc(tweet => new Date(tweet.date))

  return (
    <>
      {sortedTweets.length === 0 ? (
        <>No tweets yet </>
      ) : (
        <>
          {sortedTweets.map((tweet, index) => (
            <Tweet key={'tweet-' + index} tweet={tweet} />
          ))}
        </>
      )}
    </>
  )
}

export default TweetsList
