import React from 'react'
import { useState, useEffect, useContext, useRef } from 'react'
import Alert from './Alert'
import ClipLoader from 'react-spinners/ClipLoader'
import CharsCounter from './CharsCounter'
import { AuthContext } from '../contexts/AuthContext'
import { TweetsContext } from '../contexts/TweetsContext'
import { MAX_CHARS } from '../globals'
import { SERVER_URL } from '../globals'
import './CreateTweet.css'

function CreateTweet ({ textareaHeight }) {
  const { tweets, setTweets } = useContext(TweetsContext)
  const [content, setContent] = useState('')
  const [isContentValid, setIsContentValid] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [isAlertOn, setIsAlertOn] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const { userName } = useContext(AuthContext)
  const buttonRef = useRef(null)

  const addNewTweet = content => {
    const currentTimeDate = new Date()
    console.log('currentTimeDate=', currentTimeDate)
    const newTweet = {
      content: content,
      // content: VERY_LONG_STRING,
      userName: userName,
      date: currentTimeDate.toISOString()
    }
    // console.log('newTweet=', newTweet)
    postNew(newTweet)
  }

  const postNew = async newTweet => {
    try {
      setIsPosting(true)
      console.log('posting...')
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newTweet)
      })
      if (response.status === 400) {
        throw new Error('bad request')
      }
      setTweets([...tweets, newTweet])
    } catch (error) {
      console.log('error:', error)
      setAlertMessage('Error while posting to server!')
      setIsAlertOn(true)
    } finally {
      console.log('Done posting')
      setIsPosting(false)
    }
  }

  const handleContentChange = newValue => {
    setContent(newValue)
  }

  useEffect(() => {
    if (content.replaceAll(' ', '').length > 0 && content.length <= MAX_CHARS) {
      setIsContentValid(true)
      setAlertMessage('')
      setIsAlertOn(false)
      return
    }
    if (content.length > MAX_CHARS) {
      setAlertMessage(`The tweet can't contain more than ${MAX_CHARS} chars`)
      setIsAlertOn(true)
      setIsContentValid(false)
      return
    }
    if (content.length === 0) {
      setAlertMessage('')
      setIsAlertOn(false)
      setIsContentValid(false)
      return
    }
  }, [content])

  const handleSubmit = e => {
    e.preventDefault()
    addNewTweet(content)
    setContent('')
  }

  /* 'ENTER' -> SEND TWEET, 'CTRL' + 'ENTER' -> BREAK LINE */
  const handleKeyDown = e => {
    /* EXCEPTION FOR NOT DESKTOP BROWSERS */
    if (window.outerWidth < 900) return

    if (!e.shiftKey && e.key === 'Enter' && isContentValid) {
      e.preventDefault()
      buttonRef.current.click()
    }
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
            height: textareaHeight,
            overflow: 'hidden'
          }}
          onKeyDown={handleKeyDown}
        />
        <div className='controls'>
          <CharsCounter length={content.length} />
          <button ref={buttonRef} type='submit' disabled={!isContentValid}>
            <ClipLoader color={'white'} loading={isPosting} size={25} />
            {!isPosting && <>Tweet</>}
          </button>
        </div>
        <Alert isOn={isAlertOn} message={alertMessage} />
      </form>
    </div>
  )
}
export default CreateTweet
