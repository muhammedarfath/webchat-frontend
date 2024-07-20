import React, { createContext, useState } from 'react'

const PostContext = createContext();


function PostProvider({children}) {
  const [selectedPost,setSelectedPost] = useState(null)


  return (
     <PostContext.Provider value={{ selectedPost, setSelectedPost }}>
        {children}
     </PostContext.Provider>
  )
}

export {PostProvider,PostContext}
