import React, { createContext, useState } from 'react'

export const SearchContext = createContext();

export function SearchContextProvide(props) {

     const [value, setValue] = useState('');
  return (
    <>
          <SearchContext.Provider value={{value, setValue}}>
          {props.children}
          </SearchContext.Provider>
    </>
  )
}
