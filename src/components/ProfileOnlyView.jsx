import React from 'react'
import emptyAvatar from '../images/empty-profile.png'

function ProfileOnlyView ({ profile }) {
  return (
    <div className='ProfilePage'>
      <h2>Profile of {profile.displayName}</h2>
      <div className='avatar-lg'>
        <img
          alt='user'
          src={(profile?.avatar !== null && profile.avatar !== '') ? profile?.avatar : emptyAvatar}
        />
      </div>
      <div className='email'>{profile.email}</div>
      <div className='signed-in'>
        Last signed in: {profile.lastSignedIn.toDate().toDateString()}
      </div>
      <div className='created-in'>
        Joined: {profile.createdIn.toDate().toDateString()}
      </div>
    </div>
  )
}

export default ProfileOnlyView
