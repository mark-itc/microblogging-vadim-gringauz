import React from 'react'
import {
  Typography,
  Button,
  Drawer,
  Divider,
  Stack,
  Link,
  Box,
  Avatar
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'


function UserMenu ({ isVisible, signOut, setShowMenu, signedUser }) {
  return (
    <Drawer anchor='right' open={isVisible} onClose={() => setShowMenu(false)} >
      <Stack spacing={5} alignItems='center' sx={{ width: { xs:'250px', sm: '250px', md: '400px'} }} >
        <Button
          onClick={signOut}
          variant='contained'
          endIcon={<LogoutIcon />}
          sx={{ borderRadius: '0', width: '100%', fontSize: '1.5rem', height: '80px' }}
          color='secondary'
        >
          Sign out
        </Button>
        <Typography variant='h5'>Hello, {signedUser.displayName}</Typography>
        <Avatar
          alt={signedUser.displayName}
          src={signedUser.avatar}
          sx={{ width: 180, height: 180 }}
        />
        <Link href={`/profile/${signedUser?.uid}`}>View Profile</Link>
        {/* <Stack direction='row' spacing={1} sx={{ width: `${drawerWidth}px` }}>
          <Stack spacing={3}></Stack>
        </Stack> */}
        <Divider variant='fullWidth' flexItem />
        <div>{signedUser.email}</div>
        <Divider variant='fullWidth' flexItem />
      </Stack>
    </Drawer>
  )
}

export default UserMenu
