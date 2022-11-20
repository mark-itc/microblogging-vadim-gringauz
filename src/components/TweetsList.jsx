import React from 'react'
import Tweet from './Tweet'
import { sort } from 'fast-sort';

function TweetsList ({ tweets }) {
const sortedTweets = sort(tweets).desc(tweet => tweet.date)

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
