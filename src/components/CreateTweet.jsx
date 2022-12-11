import React from 'react'
import { useEffect, useContext, useRef, useReducer } from 'react'
import { Timestamp } from 'firebase/firestore'
import Alert from './Alert'
import ClipLoader from 'react-spinners/ClipLoader'
import CharsCounter from './CharsCounter'
import { AuthContext } from '../contexts/AuthContext'
import { TweetsContext } from '../contexts/TweetsContext'
import { MAX_CHARS } from '../utils/globals'
import tweetServer from '../utils/TweetServer'
import './CreateTweet.css'

function reducer (state, action) {
  switch (action.type) {
    case 'update-content':
      return { ...state, content: action.newValue }
    case 'clear-content':
      return { ...state, content: '' }
    case 'content-is-valid':
      return { ...state, isContentValid: true }
    case 'content-not-valid':
      return { ...state, isContentValid: false }
    case 'posting-in-progress':
      return { ...state, isPosting: true }
    case 'posting-finished':
      return { ...state, isPosting: false }
    case 'alert-on':
      return { ...state, isAlertOn: true, alertMessage: action.value }
    case 'alert-off':
      return { ...state, isAlertOn: false, alertMessage: '' }
  }
}

function CreateTweet ({ textareaHeight }) {
  const { setTweets } = useContext(TweetsContext)
  const { currentUser } = useContext(AuthContext)
  const buttonRef = useRef(null)

  const initialState = {
    content: '',
    isContentValid: false,
    isPosting: false,
    isAlertOn: false,
    alertMessage: ''
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const addNewTweet = async content => {
    if (content === 'clr') {
      deleteAll()
    }

    const newTweet = {
      content: state.content,
      userName: currentUser.userData.displayName,
      date: Timestamp.fromDate(new Date())
    }
    const isPosted = await postNew(newTweet)
    if (isPosted) setTweets(await tweetServer.getAll())
    // if (isPosted) setTweets([...tweets, newTweet])
  }

  const deleteAll = async () => {
    dispatch({ type: 'posting-in-progress' })
    await tweetServer.deleteAll()
    dispatch({ type: 'posting-finished' })
    setTweets([])
  }

  const postNew = async newTweet => {
    try {
      dispatch({ type: 'posting-in-progress' })
      tweetServer.postNew(newTweet)
      return true
    } catch (error) {
      console.log(error)
      dispatch({ type: 'alert-on', value: error.message })
      return false
    } finally {
      dispatch({ type: 'posting-finished' })
    }
  }

  const handleContentChange = newValue => {
    dispatch({ type: 'update-content', newValue: newValue })
  }

  useEffect(() => {
    if (
      state.content.replaceAll(' ', '').length > 0 &&
      state.content.length <= MAX_CHARS &&
      currentUser.userData.displayName !== ''
    ) {
      dispatch({ type: 'content-is-valid' })
      dispatch({ type: 'alert-off' })
      return
    }
    if (state.content.length > MAX_CHARS) {
      dispatch({
        type: 'alert-on',
        value: `The tweet can't contain more than ${MAX_CHARS} chars`
      })
      dispatch({ type: 'content-not-valid' })
      return
    }
    if (state.content.length === 0) {
      dispatch({ type: 'content-not-valid' })
      dispatch({ type: 'alert-off' })
      return
    }
  }, [state.content]) // eslint-disable-line

  const handleSubmit = e => {
    e.preventDefault()
    addNewTweet(state.content)
    dispatch({ type: 'clear-content' })
  }

  /* 'ENTER' -> SEND TWEET, 'CTRL' + 'ENTER' -> BREAK LINE */
  const handleKeyDown = e => {
    /* EXCEPTION FOR NOT DESKTOP BROWSERS */
    if (window.outerWidth < 900) return

    if (!e.shiftKey && e.key === 'Enter' && state.isContentValid) {
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
          value={state.content}
          style={{
            resize: 'none',
            height: textareaHeight,
            overflow: 'hidden'
          }}
          onKeyDown={handleKeyDown}
        />
        <div className='controls'>
          <CharsCounter length={state.content.length} />
          <button
            ref={buttonRef}
            type='submit'
            disabled={!state.isContentValid}
          >
            <ClipLoader color={'white'} loading={state.isPosting} size={25} />
            {!state.isPosting && <>Tweet</>}
          </button>
        </div>
        <Alert isOn={state.isAlertOn} message={state.alertMessage} />
      </form>
    </div>
  )
}
export default CreateTweet
