import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { showErrorToast } from '../../utils/Toaser';
import { useSelector } from 'react-redux';
import requests from '../../utils/urls';


const PostContext = createContext();


function PostProvider({children}) {

   const [loading, setLoading] = useState(true);
   const { user_id, is_email_verified,username } = useSelector((state) => state.auth);
   const [posts, setPost] = useState([]);
   
   useEffect(() => {
      setLoading(true);
      const fetchPosts = async () => {
        try {
          const response = await axios.post(
            `${requests.fetchPosts}${username}/`,
            {
              user_id: user_id,
            }
          );
          if (response.data && is_email_verified) {
            setPost(response.data);
          } else {
            showErrorToast(
              "Please verify your email to explore all Fybox features"
            );
          }
        } catch (error) {
          showErrorToast("errr", error);
        }
        setLoading(false);
      };
      fetchPosts();
    }, [username]);
  
  const [selectedPost, setSelectedPost] = useState(null);

  return (
     <PostContext.Provider value={{selectedPost,setSelectedPost,loading,posts,user_id}}>
        {children}
     </PostContext.Provider>
  )
}

export {PostProvider,PostContext}
