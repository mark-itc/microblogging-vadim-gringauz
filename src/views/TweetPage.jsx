import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, CircularProgress } from '@mui/material'
import { TweetsContext } from '../contexts/TweetsContext'
import { UsersContext } from '../contexts/UsersContext'
import tweetStore from '../utils/TweetStore'
import Tweet from '../components/Tweet'

function TweetPage () {
  const { id } = useParams()
  const [loading, SetLoading] = useState(false)
  const [tweet, setTweet] = useState()
  // const { getUserFromUid } = useContext(UsersContext)
  // const { displayName, setDisplayName } = useState('')
  // const { avatar, setAvatar } = useState('')

  const getTweetFromStorage = async () => {
    const tweetById = await tweetStore.getTweetById(id)
    setTweet(tweetById)
    console.log(tweetById)
    // const { displayName, avatar } = getUserFromUid(tweetById.userUid)
    // setDisplayName(displayName)
    // setAvatar(avatar)
    SetLoading(true)
  }

  useEffect(() => {
    getTweetFromStorage()
  }, [])

  return (
    <Container>
      <div>{id}</div>
      {loading ? (
        <Tweet
          key={id}
          tweet={tweet}
          // displayName={displayName}
          // avatar={avatar}
        />
      ) : (
        <CircularProgress />
      )}
    </Container>
  )
}

export default TweetPage
