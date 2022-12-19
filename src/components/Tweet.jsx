import React from 'react'
import { useNavigate } from 'react-router-dom'
import DateTimeDisplay from './DateTimeDisplay'
import emptyAvatar from '../images/empty-profile.png'
import './Tweet.css'

function Tweet ({ tweet, displayName, avatar = emptyAvatar }) {
  const { content, date } = tweet
  const navigate = useNavigate()

  return (
    <div className='Tweet'>
      <div className='avatar'>
        <img
          src={avatar !== null && avatar !== '' ? avatar : emptyAvatar}
          alt={displayName}
          onClick={() => navigate(`/profile/${tweet.userUid}`)}
        />
      </div>
      <div className='tweet-body'>
        <div className='tweet-header'>
          {/* <a href={`/profile/${tweet.userUid}`}>
          </a> */}
            <span className='user'>
              {displayName ? displayName : <>empty display name</>}
            </span>
          <span className='date'>
            {date ? (
              <DateTimeDisplay timeStamp={date.toDate()} />
            ) : (
              <>empty date</>
            )}
          </span>
        </div>
        <p className='content'>{content ? content : <>empty content</>}</p>
      </div>
    </div>
  )
}

export default Tweet
