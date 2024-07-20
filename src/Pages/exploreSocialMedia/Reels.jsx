import React, { useContext, useEffect, useState } from "react";
import { IoMdImages } from "react-icons/io";
import { useDisclosure } from "@nextui-org/react";
import Post from "../../Components/post/Post";
import PostModal from "../../Components/post/PostModal";
import SkeletonLoader from "../../utils/SkeletonLoader";
import { showErrorToast } from "../../utils/Toaser";
import { useSelector } from "react-redux";
import requests from "../../utils/urls";
import axios from "axios";
import { PostContext } from "../../Components/post/PostProvider"; 

export function Reels() {
  const { selectedPost, setSelectedPost } = useContext(PostContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const { user_id, is_email_verified,username } = useSelector((state) => state.auth);
  const [posts,setPost] = useState([])

  function handleOpen(post) {
    setSelectedPost(post);
    onOpen();
  }

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


  return (
    <>
      {loading ? (
        <SkeletonLoader count={8} />
      ) : (
        <div className="h-screen overflow-auto relative bg-white w-full">
          {user_id && posts.length > 0 ? (
            <div className="columns-2 xl:columns-4 p-4 gap-4 space-y-4">
              {posts.map((post, index) => (
                <Post
                  key={index}
                  post={post}
                  handleOpen={() => handleOpen(post)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center w-full h-full items-center">
              <IoMdImages className="text-9xl" />
              <h1 className="font-bold text-2xl">No Posts Yet</h1>
            </div>
          )}
          {selectedPost && <PostModal isOpen={isOpen} onClose={onClose} />}
        </div>
      )}
    </>
  );
}
