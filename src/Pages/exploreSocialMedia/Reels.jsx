import React, { useContext } from "react";
import { IoMdImages } from "react-icons/io";
import { useDisclosure } from "@nextui-org/react";
import Post from "../../Components/post/Post";
import PostModal from "../../Components/post/PostModal";
import SkeletonLoader from "../../utils/SkeletonLoader";
import { PostContext } from "../../Components/post/PostProvider";


export function Reels() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedPost, setSelectedPost,posts,loading,user_id } = useContext(PostContext);


  function handleOpen(post) {
    setSelectedPost(post);
    onOpen();
  }


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
