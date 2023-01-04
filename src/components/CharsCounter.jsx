import React from 'react'
import { MAX_CHARS } from '../utils/globals'
import styled from 'styled-components'

const CharsCounterStyle = styled.div`
  font-size: 0.8rem;
  
  .invalid-length {
    color: red;
  }
`

export default function CharsCounter({ length }) {
  return (
    <CharsCounterStyle>
      {length <= 140 ? (
        <span>
          {length}/{MAX_CHARS}
        </span>
      ) : (
        <span>
          <span className='invalid-length'>{length}</span>/{MAX_CHARS}
        </span>
      )}
    </CharsCounterStyle>
  )
}
