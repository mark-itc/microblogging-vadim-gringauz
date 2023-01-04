import React from 'react'
import { useState } from 'react'
import { Avatar } from '@mui/material'
import userStore from '../utils/UsersStore'
import cloudStorage from '../utils/CloudStorage'
import DisplayNameInput from './DisplayNameInput'
import './ProfileEdit.css'

function ProfileEdit ({ profile, setIsEditMode }) {
  const [displayName, setDisplayName] = useState(profile?.displayName)
  const [avatar, setAvatar] = useState()

  const saveChanges = async e => {
    e.preventDefault()
    try {
      await userStore.editDispalyName(profile.docId, displayName)

      if (avatar) {
        const url = await cloudStorage.uploadAvatar(profile.uid, avatar)
        await userStore.editAvatarURL(profile.docId, url)
      } else {
      }
      setIsEditMode(false)
    } catch (error) {
      console.log('error', error.message)
    }
  }

  const handleAvatarChange = e => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0])
    }
  }

  return (
    <div className='ProfileEdit'>
      <div className='title'>Edit Your Profile</div>
      <form action='' onSubmit={saveChanges}>
        <div className='edit-mode'>
          <DisplayNameInput
            customLabel='Edit Dispaly name'
            displayName={displayName}
            setDisplayName={setDisplayName}
            required={true}
          />
        </div>
        <label htmlFor='avatar'>New Avatar Image</label>
        <input
          type='file'
          id='avatar'
          name='avatar'
          accept='image/png, image/jpeg'
          onChange={handleAvatarChange}
        />
        <div className='avatar-lg'>
          <Avatar
            alt={displayName}
            src={avatar ? URL.createObjectURL(avatar) : null}
            sx={{ width: 200, height: 200 }}
          />
        </div>
        <div className='email'>{profile.email}</div>
        <button type='submit'>Save Changes</button>
        <button onClick={() => setIsEditMode(false)}>Cancel</button>
      </form>
    </div>
  )
}

export default ProfileEdit
