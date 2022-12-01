import React from 'react'
import './Tweet.css'

function Tweet ({ tweet }) {
  const { userName, content, date } = tweet
  return (
    <div className='Tweet'>
      <div className='tweet-header'>
        <span className='user'>{userName.stringValue}</span>
        <span className='date'>{date.timestampValue}</span>
      </div>
      <div className='tweet-body'>
        <p className='content'>{content.stringValue}</p>
      </div>
    </div>
  )
}

export default Tweet
