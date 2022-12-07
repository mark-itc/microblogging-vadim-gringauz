import React from 'react'
import { NavLink } from 'react-router-dom'
import authenticator from '../utils/Authenticator'
import Search from './SearchBar'
import './Navbar.css'

function Navbar () {
  const activeClassName = 'viewed'

  const logout = () => {
    authenticator.logout()
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
      <button onClick={logout}>Logout</button>
    </nav>
  )
}

export default Navbar
