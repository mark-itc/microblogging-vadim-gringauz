import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AuthContext } from '../contexts/AuthContext'
import { MAX_USERNAME_LENGTH } from '../utils/globals'
import userImg from '../images/empty-profile.png'
import './ProfilePage.css'

function ProfilePage () {
  const { user } = useContext(AuthContext)
  const [email, setEmail] = useState(user.email)
  const [displayName, setDisplayName] = useState(user.displayName)
  const [pic, setPic] = useState(user.photoURL)
  const [isNameValid, setIsNameValid] = useState(true)

  useEffect(() => {
    setDisplayName(user.displayName)
    if (displayName) validateName(displayName)
  }, [user]) // eslint-disable-line

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
    // isUserNameValid && setUserName({ ...userName, value: newName })
    // navigate('/')
  }

  return (
    <>
      <Navbar />
      <div className='ProfilePage'>
        <form className='login-form' onSubmit={handleSubmit}>
          {user?.displayName === '' && (
            <div className='notification'>
              Please choose a user name to login
            </div>
          )}
          <h4>Profile</h4>
          <div>
            <img className='profile-img' alt='user' src={pic} />
          </div>
          <div>
            <span>Email: </span>
            {email && <span>{email}</span>}
          </div>
          <label htmlFor=''>Display Name</label>
          <input
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
