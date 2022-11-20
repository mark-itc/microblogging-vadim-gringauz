import React from 'react'
import { useState, useEffect } from 'react'
import localforage from 'localforage'
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../components/Navbar'
import CreateTweet from '../components/CreateTweet'
import TweetsList from '../components/TweetsList'
import './HomePage.css'

function HomePage () {
  //   const temp = [
  //     { user: 'admin', date: new Date(2008, 10, 1), content: 'sadffdfd' },
  //     { user: 'admin', date: new Date(2018, 10, 1), content: '122354545' },
  //     { user: 'admin', date: new Date(2025, 10, 1), content: 'sa43vfg56' }
  //   ]
  const [tweets, setTweets] = useState([])

  const handleAddTweet = newTweet => {
    console.log('newTweet=', newTweet);
    if (newTweet.content === 'clr') {
        clearStorage()
        return
    }
    newTweet.date = new Date()
    setTweets([...tweets, newTweet])
  }

  useEffect(() => {
    const retrieveTweets = async () => {
      const tweetsFromStorage = await localforage.getItem('tweets')
      if (tweetsFromStorage) setTweets(tweetsFromStorage)
      // console.log('loaded tweets', tweets)
    }

    retrieveTweets()
  }, [])

  useEffect(() => {
    localforage.setItem('tweets', tweets)
    // console.log('saved tweets', tweets)
  }, [tweets])

  const clearStorage = () => setTweets([])

  return (
    <>
      <Navbar />
      <div className='HomePage'>
        <CreateTweet key={uuidv4()} defaultContent={''} handleAddTweet={handleAddTweet} />
        <br />
        <TweetsList tweets={tweets} />
      </div>
    </>
  )
}

export default HomePage
