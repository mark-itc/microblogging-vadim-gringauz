import React from 'react'
import { useState, useContext } from 'react'
import { UsersContext } from '../contexts/UsersContext'
import userStore from '../utils/UserStore'
import cloudStorage from '../utils/CloudStorage'
import emptyAvatar from '../images/empty-profile.png'
import DisplayNameInput from './DisplayNameInput'

function ProfileEdit ({ profile, setIsEditMode }) {
  const [displayName, setDisplayName] = useState(profile?.displayName)
  const [avatar, setAvatar] = useState()
  const { loadDataFromServer } = useContext(UsersContext)

  const saveChanges = async (e) => {
    e.preventDefault()
    console.log('saving changes...')
    await userStore.editDispalyName(profile.docId, displayName)
    if (avatar) {
      const url = await cloudStorage.uploadAvatar(profile.uid, avatar)
      console.log('avatar obj uploaded:', avatar)
      console.log('result of upload:', url)
      await userStore.editAvatarURL(profile.docId, url)
    } else {
      console.log('empty avatar - can not upload')
    }
    setIsEditMode(false)
    loadDataFromServer()
  }

  const handleAvatarChange = (e) => {
    console.log('e.target.files[0]', e.target.files[0])
    if (e.target.files[0]) {
      setAvatar(e.target.files[0])
    }
  }

  const chooseNewAvatar = () => {
    console.log('changing avatar...')
  }

  return (
    <div className='ProfilePage'>
      <h2>Edit Profile</h2>
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
          <img
            alt='user'
            src={avatar ? URL.createObjectURL(avatar) : emptyAvatar}
            // src={avatar}
          />
        </div>
        <div className='email'>{profile.email}</div>
        <button type='submit' className='edit-mode'>
          Save Changes
        </button>
        <button className='edit-mode' onClick={() => setIsEditMode(false)}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default ProfileEdit
