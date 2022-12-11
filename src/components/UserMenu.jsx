import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
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
            <button onClick={signOut}>
              <span>Sign out</span>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </div>
          <div className='body'>
            <img
              className='avatar'
              alt={userData.displayName}
              src={userData.photoURL}
            />
            <div className='user-info'>
              <div className='display-name'>Hello, {userData.displayName}</div>
              <a href='/profile'>View Profile</a>
            </div>
          </div>
          <div className='footer'>
            <div className='email'>{userData.email}</div>
            {/* <button> Sign in with a different account</button> */}
          </div>
        </>
      )}
    </div>
  )
}

export default UserMenu
