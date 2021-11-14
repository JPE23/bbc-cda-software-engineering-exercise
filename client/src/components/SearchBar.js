import React from 'react'

const SearchBar = ({onChange}) => {
  return (
      <input
          placeholder="Search for a character or actor"
          aria-label="Search for a character or actor"
          onChange={onChange}
      />
  )
}

export default SearchBar
