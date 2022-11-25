import React from 'react'
import { useState, useContext } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import { AuthContext } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import FooterNavbar from '../components/FooterNavbar'
import CreateTweet from '../components/CreateTweet'
import TweetsList from '../components/TweetsList'
import './HomePage.css'

function HomePage () {
  const [footerNavAppear, setFooterNavAppear] = useState('')
  const [textareaHeight, setTextareaHeight] = useState('180px')
  const { userName } = useContext(AuthContext)

  window.onscroll = () => {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      setFooterNavAppear('fixed')
      setTextareaHeight('74px')
      return
    }
    if (footerNavAppear === 'fixed') {
      setFooterNavAppear('')
    }
    if (textareaHeight != 180) {
      setTextareaHeight('180px')
    }
  }

  return (
    <>
      <Navbar />
      <div className='HomePage'>
        <div className='user-name'>{userName === '' ? <>Please Login</> : <>Logged in as: {userName}</>}</div>
        <CreateTweet textareaHeight={textareaHeight} />
        <br />
        <TweetsList />
      </div>
      <FooterNavbar footerNavAppear={footerNavAppear} />
    </>
  )
}

export default HomePage
