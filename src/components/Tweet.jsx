import React from 'react'
import './Tweet.css'

function Tweet ({ tweet }) {
  const { user, content, date } = tweet
  return (
    <div className='Tweet'>
      <div>
        <span>{user}</span>
        <span>{date}</span>
      </div>
      <p className='content'>{content}</p>
    </div>
  )
}

export default Tweet
