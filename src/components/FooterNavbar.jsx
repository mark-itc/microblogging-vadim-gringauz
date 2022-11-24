import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './FooterNavbar.css'

function FooterNavbar ({ footerNavAppear }) {
  const activeClassName = 'viewed'

  return (
    <div className={`start-position ${footerNavAppear}`}>
      <nav className='FooterNavbar'>
        <ul>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              <FontAwesomeIcon icon={faHouse} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/settings'
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              <FontAwesomeIcon icon={faSliders} />
            </NavLink>
          </li>
          <li>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default FooterNavbar
