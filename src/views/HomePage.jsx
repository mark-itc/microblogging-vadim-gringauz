import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import CreateTweet from '../components/CreateTweet'
import TweetsList from '../components/TweetsList'
import './HomePage.css'

function HomePage () {
  const temp = [
    { user: 'admin', date: '1/1/1', content: 'sadffdfd' },
    { user: 'admin', date: '1/1/1', content: '122354545' },
    { user: 'admin', date: '1/1/1', content: 'sa43vfg56' }
  ]
  const [tweets, setTweets] = useState(temp)

  const handleAddTweet = newTweet => {
    newTweet.date = 'new Date()'
    setTweets([...tweets, newTweet])
  }

  return (
    <>
      <Navbar />
      <div className='HomePage'>
        <CreateTweet defaultContent={''} handleAddTweet={handleAddTweet}/><br/>
        <TweetsList tweets={tweets}/>
      </div>
    </>
  )
}

export default HomePage
