import { createContext, useReducer } from 'react'
import React, { useEffect } from 'react';

export const AccountContext = createContext()

export const AccountReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT': 
      return {
        account: action.payload
      }
    default:
      return state
  }
}



export const AccountContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AccountReducer, {
   account: null
  })


  useEffect(() => {
    async function fetchAccount() {
      const account1 = JSON.parse(localStorage.getItem('user'));
    
      if (account1) {
        const userid = account1.phonenumber;
         
        const response = await fetch('http://localhost:9000/api/user/get', {
          method: 'POST',
          body: JSON.stringify({ userid}),
          headers: {
            'Content-Type': 'application/json'
          }
        })
  
        const json = await response.json()
        if (!response.ok) {
          console.log(json.error)
        }
        if (response.ok) {
          console.log("response1")
          console.log(json);
          dispatch({ type: 'SET_ACCOUNT', payload: json }) 
        }
      }else{
        console.log("error")
      } 
    }
    fetchAccount();
  }, [])


  return (
    <AccountContext.Provider value={{...state, dispatch}}>
      { children }
    </AccountContext.Provider>
  )
}