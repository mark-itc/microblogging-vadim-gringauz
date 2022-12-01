import React from 'react'
import './Tweet.css'

function Tweet ({ tweet }) {
  const { userName, content, date } = tweet
  return (
    <div className='Tweet'>
      <div className='tweet-header'>
        <span className='user'>{userName ? userName : <>empty user name</>}</span>
        <span className='date'>{date ? date.toDate().toISOString() : <>empty date</>}</span>
      </div>
      <div className='tweet-body'>
        <p className='content'>{content ? content : <>empty content</>}</p>
      </div>
    </div>
  )
}

export default Tweet
