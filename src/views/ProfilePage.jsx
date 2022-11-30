import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AuthContext } from '../contexts/AuthContext'
import { MAX_USERNAME_LENGTH } from '../globals'
import userImg from '../images/empty-profile.png'
import './ProfilePage.css'

function ProfilePage () {
  const { userName, setUserName } = useContext(AuthContext)
  const [newName, setNewName] = useState(userName.value)
  const [isUserNameValid, setIsUserNameValid] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setNewName(userName.value)
    if (newName) validateUserName(newName)
  }, [userName]) // eslint-disable-line 

  useEffect(() => {
    validateUserName(newName)
  }, [newName])

  const validateUserName = value => {
    if (value?.replaceAll(' ', '') !== '' && value.length < MAX_USERNAME_LENGTH) {
      setIsUserNameValid(true)
      return
    }

    setIsUserNameValid(false)
  }

  const handleSubmit = e => {
    e.preventDefault()
    isUserNameValid && setUserName({ ...userName, value: newName })
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <div className='ProfilePage'>
        <form className='login-form' onSubmit={handleSubmit}>
          {userName.value === '' && (
            <div className='notification'>
              Please choose a user name to login
            </div>
          )}
          <h4>Profile</h4>
          <div>
            <img className='profile-img' alt='user' src={userImg} />
          </div>
          <label htmlFor=''>Guest Name</label>
          <input
            type='text'
            placeholder=''
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <div className='go-right'>
            <button type='submit' disabled={!isUserNameValid}>
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProfilePage
