import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AuthContext } from '../contexts/AuthContext'
import userImg from '../images/empty-profile.png'
import './ProfilePage.css'

function ProfilePage () {
  const { userName, setUserName } = useContext(AuthContext)
  const [newName, setNewName] = useState(userName)
  const navigate = useNavigate()

  useEffect(() => {
    setNewName(userName)
  }, [userName])

  const isUserNameValid = value => {
    if (value.replaceAll(' ', '') != '') return true // eslint-disable-line
    return false
  }

  const handleSubmit = e => {
    e.preventDefault()
    isUserNameValid(newName) && setUserName(newName)
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <div className='ProfilePage'>
        <form className='login-form' onSubmit={handleSubmit}>
          <h4>Profile</h4>
          <div>
            <img
              className='profile-img'
              alt='user'
              src={userImg}
            />
          </div>
          <label htmlFor=''>User Name</label>
          <input
            type='text'
            placeholder=''
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <div className='go-left'>
            <button type='submit' disabled={!newName.replaceAll(' ', '') != '' /* eslint-disable-line */}> 
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProfilePage
