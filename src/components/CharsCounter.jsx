import React from 'react'
import './CharsCounter.css'
import { MAX_CHARS } from '../globals'

export default function CharsCounter ({ length }) {
  return (
    <div className='CharsCounter'>
      {length <= 140 ? (
        <span>
          {length}/{MAX_CHARS}
        </span>
      ) : (
        <span>
          <span className='invalid-length'>{length}</span>/{MAX_CHARS}
        </span>
      )}
    </div>
  )
}
