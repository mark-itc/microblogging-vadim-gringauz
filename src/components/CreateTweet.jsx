import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { MAX_CHARS } from '../globals'
import CharsCounter from './CharsCounter'
import Alert from './Alert'
import { TweetsContext } from '../contexts/TweetsContext'
import './CreateTweet.css'

function CreateTweet () {
  const { tweets, setTweets, clearStorage } = useContext(TweetsContext)
  const [content, setContent] = useState('')
  const [isContentValid, setIsContentValid] = useState(false)
  const user = 'admin' /* TEMP */

  const handleAddTweet = content => {
    if (content === 'clr') {
      clearStorage()
      return
    }

    const currentTimeDate = new Date()
    console.log('currentTimeDate=', currentTimeDate);
    const newTweet = {
      content: content,
      user: user,
      date: currentTimeDate.toISOString()
    }
    console.log('newTweet=', newTweet)
    setTweets([...tweets, newTweet])
  }

  /* WANTED TO MAKE TEXTAREA AUTO-RESIZEABLE */
  const [height, setHeight] = useState('180px')
  const autoResize = e => {
    console.log('scrollHeight', e.target.scrollHeight)
    console.log('height=', height)
    if (e.target.scrollHeight > 180) {
      setHeight('auto')
      if (e.target.scrollHeight < 196) setHeight(e.target.scrollHeight + 'px')
    } else {
      setHeight('180px')
    }
  }

  const handleContentChange = newValue => setContent(newValue)

  useEffect(() => {
    if (content.length > 0 && content.length <= MAX_CHARS) {
      setIsContentValid(true)
      return
    }
    setIsContentValid(false)
  }, [content])

  const handleSubmit = e => {
    e.preventDefault()
    handleAddTweet(content)
    setContent('')
  }
  return (
    <div className='stick-top'>
      <form className='text-container' action='submit' onSubmit={handleSubmit}>
        <textarea
          autoFocus
          name='content'
          placeholder='What you have in mind...'
          onChange={e => handleContentChange(e.target.value)}
          value={content}
          style={{
            resize: 'none',
            height: height,
            overflow: 'hidden'
          }}
          onInput={autoResize}
        />
        <div className='controls'>
          <CharsCounter length={content.length} />
          <button type='submit' disabled={!isContentValid}>
            Tweet
          </button>
        </div>
        {content.length > MAX_CHARS && <Alert />}
      </form>
    </div>
  )
}
export default CreateTweet
