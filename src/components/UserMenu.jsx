import React from 'react'
import { useState } from 'react'
import './UserMenu.css'

function UserMenu ({ isVisible, signOut, setShowMenu }) {
  return (
    <div className='UserMenu'>
      {isVisible && (
        <>
          <div className='outside-of-menu' onClick={() => setShowMenu(false)}></div>
          <div className='header'>
            <button onClick={signOut}>SignOut</button>
          </div>
          <div className='user-details'>
            <div className='avatar'>
              <img src='' alt='' />
            </div>
            <div>
              <div>email@</div>
              <div>Display Name</div>
              <a href=''>View Profile</a>
            </div>
          </div>
          <div className='footer'>SignIn with a different account</div>
        </>
      )}
    </div>
  )
}

export default UserMenu
