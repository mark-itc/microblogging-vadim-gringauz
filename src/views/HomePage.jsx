import React from 'react'
import { useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import Navbar from '../components/Navbar'
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
      console.log('scroll');
      setFooterNavAppear('fixed')
      setTextareaHeight('44px')
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
        <CreateTweet textareaHeight={textareaHeight}/>
        <br />
        <TweetsList />
      </div>
      <FooterNavbar footerNavAppear={footerNavAppear}/>
    </>
  )
}

export default HomePage
