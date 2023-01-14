import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import SearchIcon from '@mui/icons-material/Search'
import styled from 'styled-components'
import { UsersContext } from '../contexts/UsersContext'
import './FooterNavbar.css'

const FooterNavbarStyle = styled.div`
  width: inherit;
  position: fixed;
  bottom: -60px;
  transition: 0.5s;

  .fixed {
    bottom: 0;
  }

  .Mui-selected {
    color: white !important;
  }

  .MuiBottomNavigationAction-root {
    color: rgba(255, 255, 255, 0.5);
  }
`

function FooterNavbar ({ footerNavAppear }) {
  const { signedUser } = useContext(UsersContext)

  const navigate = useNavigate()

  const [value, setValue] = useState(0)
  // const ref = React.useRef(null);
  // const [messages, setMessages] = React.useState(() => refreshMessages());

  useEffect(() => {
    // ref.current.ownerDocument.body.scrollTop = 0;
    // setMessages(refreshMessages());

    console.log({value})
  }, [value]);

  return (
    <FooterNavbarStyle className={footerNavAppear}>
      <Paper elevation={8}>
        <BottomNavigation
          color='primary'
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          sx={{ width: '100%', bgcolor: 'primary.main' }}
        >
          <BottomNavigationAction label='Home' icon={<HomeIcon />} />
          <BottomNavigationAction label='Profile' icon={<PersonIcon />} />
          <BottomNavigationAction label='Settings' icon={<SettingsIcon />} />
          <BottomNavigationAction label='Search' icon={<SearchIcon />} />
        </BottomNavigation>
      </Paper>
    </FooterNavbarStyle>
  )
}

export default FooterNavbar
