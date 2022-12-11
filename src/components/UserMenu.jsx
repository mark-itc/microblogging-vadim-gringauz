import React from 'react'
import { useState } from 'react'
import './UserMenu.css'

function UserMenu ({ isVisible, signOut, setShowMenu, userData }) {
  return (
    <div className='UserMenu'>
      {isVisible && (
        <>
          <div
            className='outside-of-menu'
            onClick={() => setShowMenu(false)}
          ></div>
          <div className='header'>
            <button onClick={signOut}>Sign out</button>
          </div>
          <div className='body'>
            <img
              className='avatar'
              alt={userData.displayName}
              src={userData.photoURL}
            />
            <div className='user-info'>
              <div className='email'>{userData.email}</div>
              <div className='display-name'>{userData.displayName}</div>
              <a href=''>View Profile</a>
            </div>
          </div>
          <div className='footer'>
            <button> Sign in with a different account</button>
          </div>
        </>
      )}
    </div>
  )
}

export default UserMenu
