import React from 'react'
import { Typography, Container } from '@mui/material'
import styled from 'styled-components'
import img from '../images/err-bg.jpg'

const ErrorPageStyle = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${img});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: contain;
    background-position: center;
    background-color: blanchedalmond;
    background-blend-mode: multiply;
    color: black;
`

function ErrorPage () {
  return (
    <ErrorPageStyle>
      <Container>
        <Typography
          variant='h1'
          sx={{
            fontSize: '10rem',
            textAlign: 'left',
            paddingLeft: '30px',
            fontStyle: 'italic',
            '&:hover': { textShadow: '5px 5px darkgray' }
          }}
        >
          404
        </Typography>
        <Typography
          variant='h2'
          sx={{
            fontSize: '3rem',
            textAlign: 'left',
            paddingLeft: '30px'
          }}
        >
          Are you lost?
        </Typography>
        <Typography
          variant='h2'
          component={'h3'}
          sx={{
            fontSize: '3rem',
            textAlign: 'left',
            paddingLeft: '30px'
          }}
        >
          Or do I have a bug??
        </Typography>
      </Container>
    </ErrorPageStyle>
  )
}

export default ErrorPage
