import * as React from 'react'
import { useState } from 'react'
import authenticator from '../utils/Authenticator'
import {
  IconButton,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Typography,
  Container,
  Tooltip,
  InputAdornment,
  Collapse,
  Alert,
  Stack
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import GoogleSignInButton from './GoogleSignInButton'


const theme = createTheme()

function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alertMessage, setalertMessage] = useState('')
  const [isAlertOn, setIsAlertOn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState(false) // eslint-disable-line
  const [emailError, setEmailError] = useState(false) // eslint-disable-line

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })
    const result = await authenticator.signIn({
      email: data.get('email'),
      password: data.get('password')
    })
    //* ERROR IS RETURNED
    if (typeof result !== Object) {
      setIsAlertOn(true)
      switch (result) {
        case 'auth/user-not-found': {
        }
        case 'auth/wrong-password': { // eslint-disable-line
          setalertMessage('Wrong email or password!')
          break
        }
        default:
          setalertMessage('Error signing in')
      }
      setEmail('')
      setPassword('')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Collapse in={isAlertOn}>
            <Alert severity='error'>{alertMessage}</Alert>
          </Collapse>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
            }}
          >
            <TextField
              value={email}
              onChange={e => setEmail(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              error={emailError}
              helperText="Not a valid email"
            />
            <TextField
              value={password}
              onChange={e => setPassword(e.target.value)}
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
              error={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            >
            </TextField>
            <Tooltip title='Not functional yet'>
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
            </Tooltip>
            <Button
              type='submit'
              disabled={
                email.replaceAll(' ', '').length === 0 ||
                password.replaceAll(' ', '').length === 0
              }
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              </Grid>
            </Grid> */}
          </Box>
          <Stack spacing={2} sx={{ width: '100%' }} >
            <Typography variant='body2' >
              Or sign in with:
            </Typography>
            <GoogleSignInButton />
            <Link href='/sign-up' variant='body2'>
              {"Don't have an account? Sign Up"}
            </Link>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignInForm
