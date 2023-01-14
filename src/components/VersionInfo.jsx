import React from 'react'
import styled from 'styled-components'

const VersionInfoStyle = styled.div`
  font-size: 0.7rem;
  position: fixed;
  left: 10;
  top: 5;
  z-index: 99;
`

function VersionInfo() {
  return (
    <VersionInfoStyle>
      VG / ITC / React - Microblogging / M-6.5 Ver 0.3.0
    </VersionInfoStyle>
  )
}

export default VersionInfo
