import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {
  Container,
  Avatar,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Tooltip,
  MenuItem,
  InputBase
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import styled from 'styled-components'
import { UsersContext } from '../contexts/UsersContext'
import authenticator from '../utils/Authenticator'
import UserMenu from './UserMenu'
import Logo from './Logo'

const NavBarStyle = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 98;
  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5);
  }

  a:hover {
    color: black;
    text-decoration: underline;
  }

  .active {
    color: white;
  }
`

function Navbar () {
  const activeClassName = 'active'
  const { signedUser } = useContext(UsersContext)
  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()

  const signOut = () => {
    authenticator.signOut()
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  // const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  // const handleOpenUserMenu = event => {
  //   setAnchorElUser(event.currentTarget)
  // }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null)
  // }

  return (
    <NavBarStyle>
      <AppBar sx={{ paddingTop: '15px' }}>
        <Container maxWidth='lg'>
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
                <MenuItem
                  key='home'
                  onClick={e => {
                    handleCloseNavMenu()
                    navigate('/')
                  }}
                >
                  <Typography textAlign='center'>HOME</Typography>
                </MenuItem>
                <MenuItem
                  key='profile'
                  onClick={e => {
                    handleCloseNavMenu()
                    navigate(`/profile/${signedUser?.uid}`)
                  }}
                >
                  <Typography textAlign='center'>PROFILE</Typography>
                </MenuItem>
                <MenuItem
                  key='settings'
                  onClick={e => {
                    handleCloseNavMenu()
                    navigate('/settings')
                  }}
                >
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
            <InputBase
              // sx={{ ml: 1, flex: 1 }}
              placeholder='Search Tweets...'
              autoComplete
              sx={{
                display: { xs: 'none', md: 'flex' },
                ml: 1,
                flex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '10px',
                padding: '5px'
              }}
            />
            <IconButton type='button'>
              <SearchIcon />
            </IconButton>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={signedUser.displayName}>
                <IconButton
                  onClick={() => setShowMenu(!showMenu)}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    alt={signedUser.displayName}
                    src={signedUser.avatar}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
        <UserMenu
          isVisible={showMenu}
          signOut={signOut}
          setShowMenu={setShowMenu}
          signedUser={signedUser}
        />
      </AppBar>
    </NavBarStyle>
  )
}

export default Navbar
