import React, { useState } from "react";
import Avatar_profile from "../avatar/Avatar_profile";
import { Link } from "react-router-dom";
import FollowButton from "../follow_btn/FollowButton";

const Post = ({ post, handleOpen }) => {
  const isImage = (mediaFile) => {
    const extension = mediaFile.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension);
  };

  console.log(post,"user post");


  return (
    <div
      className="relative group cursor-pointer w-full h-full flex justify-center items-center"
      onClick={handleOpen}
    >
     {post.media_file ? (
        isImage(post.media_file) ? (
          <img
            src={`http://127.0.0.1:8000${post.media_file}`}
            alt={`Image ${post.id}`}
            className="w-full h-auto rounded-3xl"
          />
        ) : (
          <video
            controls
            autoPlay
            muted
            src={`http://127.0.0.1:8000${post.media_file}`}
            className="w-full h-auto rounded-3xl"
            onEnded={(e)=>e.target.play()}
          />
        )
      ) : (
        <img
          src={`http://127.0.0.1:8000${post.picture}`}
          alt={`Image ${post.id}`}
          className="w-full h-auto rounded-3xl"
        />
      )}

      <div className="absolute bottom-0 text-white left-0 rounded-3xl w-full h-full bg-black bg-opacity-30 flex items-end justify-between pr-6 pb-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-4 right-6">
          <FollowButton
            follow_user={post.user.username}
            follow_status={post.follow_status}
          />
        </div>
        <div className="pl-4">
          <Link to={`/profile/${post.user.username}`}>
            <div className="flex gap-3">
              <Avatar_profile
                image={post.profile.image}
                username={post.user.username}
              />
              <h1>{post.user.username}</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
