import React from 'react'
import Navbar from '../components/Navbar'

function ProfilePage () {
  return (
    <>
      <Navbar />
      <h4>Profile</h4>
      <div>
        <img src='../images/no-profile.png' />
      </div>
      <form action=''>
        <label htmlFor=''>User Name</label>
        <input type='text' />
        <button>Save</button>
      </form>
    </>
  )
}

export default ProfilePage
