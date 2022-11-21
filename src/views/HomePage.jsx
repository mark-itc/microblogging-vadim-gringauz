import React from 'react'
// import { v4 as uuidv4 } from 'uuid'
import Navbar from '../components/Navbar'
import CreateTweet from '../components/CreateTweet'
import TweetsList from '../components/TweetsList'
import './HomePage.css'

function HomePage () {
  return (
    <>
      <Navbar />
      <div className='HomePage'>
        <CreateTweet />
        <br />
        <TweetsList />
      </div>
    </>
  )
}

export default HomePage
