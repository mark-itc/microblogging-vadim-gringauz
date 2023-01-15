import React from 'react'
import styled from 'styled-components'
import { Stack, Avatar, Typography, Divider } from '@mui/material'
import { useContext } from 'react'
import { UsersContext } from '../contexts/UsersContext'
import { faL } from '@fortawesome/free-solid-svg-icons'



const UserDashboardStyle = styled.div`
  width: 100%;
  background-color: var(--bg-secondary);
  border-radius: 6px;
  padding: 5px;
`

function UserDashboard () {
  const { signedUser, users } = useContext(UsersContext)

  return (
    <UserDashboardStyle>
      <Stack spacing={2} alignItems={'center'}>
        <Avatar
          variant='rounded'
          alt={signedUser.displayName}
          src={signedUser.avatar}
          sx={{ width: '100px', height: '100px' }}
        />
        <Typography fontSize={'1.2rem'} fontWeight={'bold'} color={'primary'}>
          {signedUser.displayName}
        </Typography>
        <Typography fontSize={'0.7rem'} fontStyle={'italic'}>
          {signedUser.email}
        </Typography>
        <Divider variant='fullWidth' flexItem />
        <Typography fontSize={'1.2rem'}>All users:</Typography>
        {users.map(user => (
          <Stack direction={'row'} width={'100%'} spacing={1}>
            <Avatar
              alt={user.displayName}
              src={user.avatar}
              sx={{ width: '20px', height: '20px' }}
            />
            <Typography fontSize={'0.8rem'} textAlign={'left'} >
              {user.displayName}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </UserDashboardStyle>
  )
}

export default UserDashboard
