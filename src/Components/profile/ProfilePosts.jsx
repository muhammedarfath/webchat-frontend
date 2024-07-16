import React from "react";
import { IoMdImages } from "react-icons/io";
import Post from "../post/Post";
import SkeletonLoader from "../../utils/SkeletonLoader";

function ProfilePosts({ user, handleOpen, loading }) {
  return (
    <div className="h-screen bg-white w-full">
      {loading ? (
        <SkeletonLoader count={4} />
      ) : (
        <>
          {user.posts.length > 0 ? (
            <div className="columns-2 xl:columns-4 p-4 gap-4 space-y-4">
              {user.posts.map((post, index) => (
                <Post key={index} post={post} handleOpen={handleOpen} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center w-full h-full items-center">
              <IoMdImages className="text-9xl" />
              <h1 className="font-bold text-2xl">No Post Yet</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProfilePosts;
