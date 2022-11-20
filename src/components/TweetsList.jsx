import React from 'react'
import Tweet from './Tweet'


function TweetsList({ tweets }) {
    return (
      <>
        {tweets.length === 0 ? (
          <>No tweets yet </>
        ) : (
          <>
              {tweets.map((tweet, index) => (
                <Tweet key={'tweet-' + index} tweet={tweet} />
              ))}
          </>
        )}
      </>
    )
  }

export default TweetsList
