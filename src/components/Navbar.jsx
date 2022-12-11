import React from 'react'
import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import authenticator from '../utils/Authenticator'
import Search from './SearchBar'
import UserMenu from './UserMenu'
import './Navbar.css'

function Navbar () {
  const activeClassName = 'viewed'
  const { currentUser } = useContext(AuthContext)
  const { userData } = currentUser
  const avatar = userData.photoURL
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
          alt={userData.displayName}
          src={avatar}
        />
        <UserMenu
          isVisible={showMenu}
          signOut={signOut}
          setShowMenu={setShowMenu}
          userData={userData}
        />
      </div>
    </nav>
  )
}

export default Navbar
