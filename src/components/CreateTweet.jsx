import React from 'react'
import { useState, useEffect } from 'react'
import CharsCounter from './CharsCounter'
import { MAX_CHARS } from '../globals'
import './CreateTweet.css'
import Alert from './Alert'

function CreateTweet ({ defaultContent, handleAddTweet }) {
  const [content, setContent] = useState(defaultContent)
  const [isContentValid, setIsContentValid] = useState(false)
  const user = 'admin'

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
    handleAddTweet({ user: user, content: content })
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
