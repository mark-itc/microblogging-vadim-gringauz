import React from 'react'
import emptyAvatar from '../images/empty-profile.png'
import './ProfileOnlyView.css'

function ProfileOnlyView ({ profile }) {
  return (
    <div className='ProfileOnlyView'>
      <div className='display-name'>{profile.displayName}</div>
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
