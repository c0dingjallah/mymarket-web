import { createContext, useReducer } from 'react'
import React, { useEffect } from 'react';

export const PostsContext = createContext()

export const PostsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS': 
      return {
        Posts: action.payload
      }
    default:
      return state
  }
}



export const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostsReducer, {
   Postss: null
  })

  useEffect(() => {
    async function fetchPosts() {
      const account1 = JSON.parse(localStorage.getItem('student'));
      const account2 = JSON.parse(localStorage.getItem('tutor'));
      const userid = "";
  
      if (account1) {
        const userid = account1.emailornum;
        const type = "studentnumber";
  
        const response = await fetch('/api/Posts/get', {
          method: 'POST',
          body: JSON.stringify({ userid, type }),
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
          dispatch({ type: 'SET_POSTS', payload: json }) 
        }
      } else if (account2) {
        const userid = account2.emailornum;
        const type = "teachernumber";
  
        const response = await fetch('/api/posts/get', {
          method: 'POST',
          body: JSON.stringify({ userid, type }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
  
        const json = await response.json()
        if (!response.ok) {
          console.log(json.error)
        }
        if (response.ok) {
          console.log("response2")
          console.log(json);
          dispatch({ type: 'SET_POSTS', payload: json }) 
        }
      }
    }
  
    fetchPosts();
  }, [])
  


  return (
    <PostsContext.Provider value={{...state, dispatch}}>
      { children }
    </PostsContext.Provider>
  )
}