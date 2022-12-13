import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { MAX_USERNAME_LENGTH } from '../utils/globals'
import authenticator from '../utils/Authenticator'
import './ProfilePage.css'
import defaultAvatar from '../images/empty-profile.png'

function ProfilePage () {
  const { currentUser } = useContext(AuthContext)
  const email = currentUser.userData.email
  const [displayName, setDisplayName] = useState(
    currentUser.userData.displayName ? currentUser.userData.displayName : ''
  )
  const avatar = currentUser.userData.photoURL
    ? currentUser.userData.photoURL
    : defaultAvatar

  const [isNameValid, setIsNameValid] = useState(true)

  useEffect(() => {
    setDisplayName(
      currentUser.userData.displayName ? currentUser.userData.displayName : ''
    )
    if (displayName) validateName(displayName)
  }, [currentUser]) // eslint-disable-line

  useEffect(() => {
    validateName(displayName)
  }, [displayName])

  const validateName = value => {
    if (
      value?.replaceAll(' ', '') !== '' &&
      value.length < MAX_USERNAME_LENGTH
    ) {
      setIsNameValid(true)
      return
    }

    setIsNameValid(false)
  }

  const handleSubmit = e => {
    e.preventDefault()
    isNameValid && authenticator.updateUserProfile({ displayName })
  }

  return (
    <>
      <div className='ProfilePage'>
        <form onSubmit={handleSubmit}>
          {currentUser.userData?.displayName === '' && (
            <div className='notification'>
              Please choose a user name to signIn
            </div>
          )}
          <h4>Profile</h4>
          <div>
            <img className='avatar-lg' alt='user' src={avatar} />
          </div>
          <div>
            <span>Email: </span>
            {email && <span>{email}</span>}
          </div>
          <label htmlFor='display-name'>Display Name</label>
          <input
            id='display-name'
            type='text'
            placeholder=''
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
          <div className='go-right'>
            <button type='submit' disabled={!isNameValid}>
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProfilePage
