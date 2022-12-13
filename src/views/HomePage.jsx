import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import FooterNavbar from '../components/FooterNavbar'
import CreateTweet from '../components/CreateTweet'
import TweetsList from '../components/TweetsList'
import Navbar from '../components/Navbar'
import './HomePage.css'

function HomePage () {
  const [footerNavAppear, setFooterNavAppear] = useState('')
  const [textareaHeight, setTextareaHeight] = useState('180px')
  const { currentUser } = useContext(AuthContext)

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
    if (textareaHeight !== 180) {
      setTextareaHeight('180px')
    }
  }

  return (
    <>
      <Navbar />
      <div className='HomePage'>
        <div className='user-name'>
          {currentUser.userData ? (
            <>Logged in as: {currentUser.userData.displayName}</>
          ) : (
            <>Please SignIn</>
          )}
        </div>
        <CreateTweet textareaHeight={textareaHeight} />
        <br />
        <TweetsList />
      </div>
      <FooterNavbar footerNavAppear={footerNavAppear} />
    </>
  )
}

export default HomePage
