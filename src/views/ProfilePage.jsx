import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AuthContext } from '../contexts/AuthContext'
import './ProfilePage.css'

function ProfilePage () {
  const { userName, setUserName } = useContext(AuthContext)
  const [newName, setNewName] = useState(userName)
  const navigate = useNavigate()

  useEffect(() => {
    setNewName(userName)
  }, [userName])

  const isUserNameValid = value => {
    if (value.replaceAll(' ', '') != '') return true
    return false
  }

  const handleSubmit = e => {
    e.preventDefault()
    isUserNameValid(newName) && setUserName(newName)
    navigate('/')
  }

  return (
    <div className='ProfilePage'>
      <Navbar />
      <form className='login-form' onSubmit={handleSubmit}>
        <h4>Profile</h4>
        <div>{/* <img src='../images/no-profile.png' /> */}</div>
        <label htmlFor=''>User Name</label>
        <input
          type='text'
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <div className='go-left'>
          <button type='submit' disabled={!newName.replaceAll(' ', '') != ''}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default ProfilePage
