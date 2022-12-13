import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import FooterNavbar from '../components/FooterNavbar'
import CreateTweet from '../components/CreateTweet'
import TweetsList from '../components/TweetsList'
import './HomePage.css'

function HomePage () {
  const [footerNavAppear, setFooterNavAppear] = useState('')
  const [textareaHeight, setTextareaHeight] = useState('180px')

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
      <div className='HomePage'>
        <CreateTweet textareaHeight={textareaHeight} />
        <TweetsList />
      </div>
      <FooterNavbar footerNavAppear={footerNavAppear} />
    </>
  )
}

export default HomePage
