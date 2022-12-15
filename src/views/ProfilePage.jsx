import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { UsersContext } from '../contexts/UsersContext'
import emptyAvatar from '../images/empty-profile.png'
import './ProfilePage.css'

// const PARAM = 'hHYw4INahUTk9PFM3axjcfdVPrg2'
const PARAM = 'NlrHXp7dI7MmWJCzDaIXJApQGOx1'

function ProfilePage () {
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
  }, [users])

  return (
    <>
      {profile ? (
        <div className='ProfilePage'>
          <h2>Profile of {profile.displayName}</h2>
          <div className='avatar-lg'>
            <img
              alt='user'
              src={profile.avatar !== null ? profile?.avatar : emptyAvatar}
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
      ) : (
        <>Profile not found</>
      )}
    </>
  )
}

export default ProfilePage
