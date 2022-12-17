import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { UsersContext } from '../contexts/UsersContext'
import ProfileOnlyView from '../components/ProfileOnlyView'
import ProfileEdit from '../components/ProfileEdit'
import './ProfilePage.css'

function ProfilePage () {
  const [isEditMode, setIsEditMode] = useState(false)
  const { uid } = useParams()
  const { users, getUserFromUid } = useContext(UsersContext)
  const { currentUser } = useContext(AuthContext)
  const signedInUserUid = currentUser.userData.uid
  const [profile, setProfile] = useState()

  useEffect(() => {
    if (users === 'before-loading') return
    if (!uid) {
      setProfile(getUserFromUid(signedInUserUid))
      return
    }
    setProfile(getUserFromUid(uid))
  }, [users]) // eslint-disable-line

  return (
    <div className='ProfilePage'>
      {profile ? (
        isEditMode ? (
          <ProfileEdit profile={profile} setIsEditMode={setIsEditMode} />
        ) : (
          <>
            <ProfileOnlyView profile={profile} />
            {!uid || uid === signedInUserUid ? (
              <button className='edit-mode' onClick={() => setIsEditMode(true)}>
                Edit Profile
              </button>
            ) : null}
          </>
        )
      ) : (
        <>Profile not found</>
      )}
    </div>
  )
}

export default ProfilePage
