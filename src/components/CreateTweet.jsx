import React from 'react'
import { useEffect, useContext, useRef, useReducer, useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { Collapse, Alert, Stack, Snackbar } from '@mui/material'
import { UsersContext } from '../contexts/UsersContext'
import { TweetsContext } from '../contexts/TweetsContext'
import { MAX_CHARS } from '../utils/globals'
import tweetStore from '../utils/TweetStore'
import TextContainer from './TextContainer'

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
    default:
      return { ...state }
  }
}

function CreateTweet ({ textareaHeight }) {
  const [openSnackbar, setOpenSnackbar] = useState(true)
  const { setTweets } = useContext(TweetsContext)
  const { signedUser } = useContext(UsersContext)
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
    //* USED TO CLEAR ALL TWEETS FOR DEBUGGING PURPOSES
    if (content === 'clr') {
      await deleteAll()
      return
    }

    const newTweet = {
      content: state.content,
      userUid: signedUser.uid,
      date: Timestamp.fromDate(new Date())
    }

    await postNew(newTweet)
    //? NOT NEEDED WITH REAL-TIME UPDATE?
    // const isPosted = await postNew(newTweet)
    // if (isPosted) setTweets(await tweetStore.getAll())
  }

  const deleteAll = async () => {
    dispatch({ type: 'posting-in-progress' })
    await tweetStore.deleteAll()
    dispatch({ type: 'posting-finished' })
    setTweets([])
  }

  const postNew = async newTweet => {
    try {
      dispatch({ type: 'posting-in-progress' })
      tweetStore.postNew(newTweet)
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
      signedUser.displayName !== ''
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
    setOpenSnackbar(true)
  }

  //* 'ENTER' -> SEND TWEET, 'CTRL' + 'ENTER' -> BREAK LINE
  const handleKeyDown = e => {
    //* EXCEPTION FOR NOT DESKTOP BROWSERS
    if (window.outerWidth < 900) return

    if (!e.shiftKey && e.key === 'Enter' && state.isContentValid) {
      e.preventDefault()
      buttonRef.current.click()
    }
  }

  return (
    <Stack>
      <Snackbar open={openSnackbar } autoHideDuration={1000} onClose={() => setOpenSnackbar(false)} >
        <Alert severity='success' sx={{ width: '100%' }}>
          Tweet was sent successfully!
        </Alert>
      </Snackbar>
      <TextContainer
        handleSubmit={handleSubmit}
        state={state}
        handleKeyDown={handleKeyDown}
        textareaHeight={textareaHeight}
        handleContentChange={handleContentChange}
        buttonRef={buttonRef}
      />
      <Collapse in={state.isAlertOn}>
        <br />
        <Alert severity='error'>{state.alertMessage}</Alert>
      </Collapse>
    </Stack>
  )
}
export default CreateTweet
