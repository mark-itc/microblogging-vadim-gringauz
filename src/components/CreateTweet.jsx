import React from 'react'
import { useState, useEffect, useContext } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { MAX_CHARS } from '../globals'
import CharsCounter from './CharsCounter'
import Alert from './Alert'
import { TweetsContext } from '../contexts/TweetsContext'
import './CreateTweet.css'
import { SERVER_URL } from '../globals'

const USER = 'admin' /* TEMP */
/* USED FOR DEBUGGING */
const VERY_LONG_STRING =
  '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'

function CreateTweet () {
  const { tweets, setTweets, clearStorage } = useContext(TweetsContext)
  const [content, setContent] = useState('')
  const [isContentValid, setIsContentValid] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [isAlertOn, setIsAlertOn] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  

  const addNewTweet = content => {
    const currentTimeDate = new Date()
    console.log('currentTimeDate=', currentTimeDate)
    const newTweet = {
      content: content,
      // content: VERY_LONG_STRING,
      userName: USER,
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
        return
      }
      const result = await response.json()
      // console.log(result)
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

  /* WANTED TO MAKE TEXTAREA AUTO-RESIZEABLE */
  const [height, setHeight] = useState('180px')
  const autoResize = e => {
    // console.log('scrollHeight', e.target.scrollHeight)
    // console.log('height=', height)
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
      setAlertMessage('')
      setIsAlertOn(false)
      return
    }
    if (content.length > MAX_CHARS) {
      setAlertMessage(`The tweet can't contain more than ${MAX_CHARS} chars`)
      setIsAlertOn(true)
    }
    setIsContentValid(false)
  }, [content])

  const handleSubmit = e => {
    e.preventDefault()
    addNewTweet(content)
    setContent('')
  }

  /* 'ENTER' -> SEND TWEET, 'CTRL' + 'ENTER' -> BREAK LINE */
  const handleKeyDown = e => {
    if (e.shiftKey && e.key === 'Enter') {
      setContent(content + '\n')
    } else if (e.key === 'Enter' && isContentValid) {
      e.preventDefault()
      addNewTweet(content)
      setContent('')
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
          onCut={e => handleContentChange(e.target.value)}
          value={content}
          style={{
            resize: 'none',
            height: height,
            overflow: 'hidden'
          }}
          onInput={autoResize}
          onKeyDown={handleKeyDown}
        />
        <div className='controls'>
          <CharsCounter length={content.length} />
          <button type='submit' disabled={!isContentValid}>
            <ClipLoader color={'white'} loading={isPosting} size={25} />
            {!isPosting && <>Tweet</>}
          </button>
        </div>
        <Alert isOn={isAlertOn} message={alertMessage}/>
      </form>
    </div>
  )
}
export default CreateTweet
