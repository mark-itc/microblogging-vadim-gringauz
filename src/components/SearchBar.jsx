import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './SearchBar.css'

function SearchBar () {
  return (
    <div className='SearchBar'>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input type='text' value={''} />
    </div>
  )
}

export default SearchBar
