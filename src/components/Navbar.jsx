import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { UsersContext } from '../contexts/UsersContext'
import authenticator from '../utils/Authenticator'
import Search from './SearchBar'
import UserMenu from './UserMenu'
import Logo from './Logo'
import './Navbar.css'
import CursorPointer from '../styled-components/CursorPointer'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

const pages = ['Home', 'Profile', 'Settings']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function Navbar () {
  const activeClassName = 'viewed'
  const { signedUser } = useContext(UsersContext)
  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()

  const signOut = () => {
    authenticator.signOut()
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              <Logo size={40} />
              VG-Tweets
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                <MenuItem key='home' onClick={e => {
                  handleCloseNavMenu()
                  navigate('/')
                  }}>
                  <Typography textAlign='center'>HOME</Typography>
                </MenuItem>
                <MenuItem key='profile' onClick={e => {
                  handleCloseNavMenu()
                  navigate(`/profile/${signedUser?.uid}`)
                  }}>
                  <Typography textAlign='center'>PROFILE</Typography>
                </MenuItem>
                <MenuItem key='settings' onClick={e => {
                  handleCloseNavMenu()
                  navigate('/settings')
                  }}>
                  <Typography textAlign='center'>SETTINGS</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant='h5'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              <Logo size={40} />
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                HOME
              </NavLink>
              <NavLink
                to={`/profile/${signedUser?.uid}`}
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                PROFILE
              </NavLink>
              <NavLink
                to='/settings'
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                SETTINGS
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {settings.map(setting => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))} */}
                <UserMenu
                  isVisible={true}
                  // isVisible={showMenu}
                  signOut={signOut}
                  setShowMenu={setShowMenu}
                  signedUser={signedUser}
                />{' '}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
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
              to={`/profile/${signedUser?.uid}`}
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
        <div className='avatar-sm'>
          <CursorPointer>
            <Avatar
              alt={signedUser.displayName}
              src={signedUser.avatar}
              // sx={window.screen.width > 600 ? { width: 30, height: 30 } : { width: 80, height: 80 }}
              onClick={() => setShowMenu(!showMenu)}
            />
          </CursorPointer>
          <UserMenu
            isVisible={showMenu}
            signOut={signOut}
            setShowMenu={setShowMenu}
            signedUser={signedUser}
          />
        </div>
      </nav>
    </>
  )
}

export default Navbar
