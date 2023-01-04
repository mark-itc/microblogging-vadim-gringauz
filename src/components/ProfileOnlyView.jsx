import React from 'react'
import { Avatar } from '@mui/material'
import './ProfileOnlyView.css'

function ProfileOnlyView ({ profile }) {
  return (
    <div className='ProfileOnlyView'>
      <div className='display-name'>{profile.displayName}</div>
      <div className='avatar-lg'>
        <Avatar
          alt={profile.displayName}
          src={profile.avatar}
          sx={{ width: 200, height: 200 }}
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
