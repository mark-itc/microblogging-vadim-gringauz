import React from 'react'
import './Tweet.css'

function Tweet ({ tweet }) {
  const { user, content, date } = tweet
  console.log('tweet', tweet);
  console.log('date=', date);
  return (
    <div className='Tweet'>
      <div className='tweet-header'>
        <span className='user'>{user}</span>
        <span className='date'>{date}</span>
      </div>
      <div className='tweet-body'>
        <p className='content'>{content}</p>
      </div>
    </div>
  )
}

export default Tweet
