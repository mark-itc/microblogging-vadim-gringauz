import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './SearchBar.css'

function SearchBar () {
  const [term, setTerm] = useState('')

  return (
    <div className='SearchBar'>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input type='text' value={term} onChange={e => setTerm(e.target.value)}/>
    </div>
  )
}

export default SearchBar
