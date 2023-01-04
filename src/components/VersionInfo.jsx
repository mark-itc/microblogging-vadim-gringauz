import React from 'react'
import styled from 'styled-components'

const VersionInfoStyle = styled.div`
  color: gray;
  font-size: 0.7rem;
`

function VersionInfo() {
  return (
    <VersionInfoStyle>
      VG / ITC / React - Microblogging / M-6.5 Ver 0.2.0
    </VersionInfoStyle>
  )
}

export default VersionInfo
