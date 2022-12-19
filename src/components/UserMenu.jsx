import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import './UserMenu.css'
import defaultAvatar from '../images/empty-profile.png'

function UserMenu ({ isVisible, signOut, setShowMenu, signedUser }) {
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
              alt={signedUser.displayName}
              src={signedUser.avatar ? signedUser.avatar : defaultAvatar}
            />
            <div className='user-info'>
              <div className='display-name'>Hello, {signedUser.displayName}</div>
              <a href={`/profile/${signedUser?.uid}`}>View Profile</a>
            </div>
          </div>
          <div className='footer'>
            <div className='email'>{signedUser.email}</div>
            {/* <button> Sign in with a different account</button> */}
          </div>
        </>
      )}
    </div>
  )
}

export default UserMenu
