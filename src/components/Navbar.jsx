import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { UsersContext } from '../contexts/UsersContext'
import authenticator from '../utils/Authenticator'
import Search from './SearchBar'
import UserMenu from './UserMenu'
import './Navbar.css'
import emptyAvatar from '../images/empty-profile.png'

function Navbar () {
  const activeClassName = 'viewed'
  const { currentUser } = useContext(AuthContext)
  const { signedUser } = useContext(UsersContext)
  const [showMenu, setShowMenu] = useState(false)

  const signOut = () => {
    authenticator.signOut()
  }

  return (
    <nav className='Navbar'>
      <ul>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/settings'
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Settings
          </NavLink>
        </li>
        <li className='align-left'>
          <Search />
        </li>
      </ul>
      <div className='user'>
        <img
          onClick={() => setShowMenu(!showMenu)}
          className={'avatar-sm ' + (showMenu ? 'clicked' : '')}
          alt={signedUser?.displayName}
          src={(signedUser?.avatar !== null  && signedUser?.avatar !== '') ? signedUser?.avatar : emptyAvatar}
        />
        <UserMenu
          isVisible={showMenu}
          signOut={signOut}
          setShowMenu={setShowMenu}
          signedUser={signedUser}
        />
      </div>
    </nav>
  )
}

export default Navbar
