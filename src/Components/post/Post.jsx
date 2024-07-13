import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle } from "react-icons/tb";
import { VscLiveShare } from "react-icons/vsc";
import { MdSaveAlt } from "react-icons/md";
import Avatar_profile from "../avatar/Avatar_profile";
import axios from "axios";
import LikeSVG from "./Likesvg";
import { FcLike } from "react-icons/fc";
import { useSelector } from "react-redux";

const Post = ({ post, handleOpen }) => {
  const [likes, setLikes] = useState(post.likes);
  const { username } = useSelector((state) => state.auth);
  const [liked, setLiked] = useState(post.is_liked);

  const handleClick = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/posts/like-post/${post.id}/`,
        {
          username: username,
        }
      );
      console.log(response.data, "check karo vai");
      if (response.data) {
        setLikes(response.data.post.likes);
        setLiked(!liked);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative group cursor-pointer flex justify-center items-center"
      onClick={() => handleOpen(post)}
    >
      {liked && <LikeSVG />}
      <img
        src={`http://127.0.0.1:8000${post.picture}`}
        alt={`Image ${post.id}`}
        className="w-full h-auto rounded-3xl"
      />

      <div className="absolute bottom-0 text-white left-0 rounded-3xl w-full h-full bg-black bg-opacity-30 flex items-end justify-between pr-6 pb-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="ml-4">
          <div className="flex gap-3">
            <Avatar_profile image={post.user.image} username={post.user.username} />
            <h1>{post.user.username}</h1>
          </div>
          <span className="ml-6">{post.caption}</span>
          <div className="">
            {post.tags.map((tag) => (
              <a key={tag.id} className="ml-6 mr-2 text-blue-200">
                #{tag.title}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center ">
            {liked ? (
              <FcLike
                onClick={handleClick}
                className="text-black border-none p-2 bg-white bg-opacity-40 rounded-full w-9 h-9 font-bold text-2xl cursor-pointer"
              />
            ) : (
              <AiOutlineHeart
                onClick={handleClick}
                className="text-black border-none p-2 bg-white bg-opacity-40 rounded-full w-9 h-9 font-bold text-2xl cursor-pointer"
              />
            )}
            <small>{likes}</small>
          </div>
          <div className="flex flex-col items-center">
            <TbMessageCircle className="text-black border-none p-2 bg-white bg-opacity-40 rounded-full w-9 h-9 font-bold text-4xl cursor-pointer" />
            <small>0</small>
          </div>
          <div className="flex flex-col items-center">
            <VscLiveShare className="text-black border-none p-2 bg-white bg-opacity-40 rounded-full w-9 h-9 font-bold text-4xl cursor-pointer" />
            <small>0</small>
          </div>
          <MdSaveAlt className="text-black border-none p-2 bg-white bg-opacity-40 rounded-full w-9 h-9 font-bold text-4xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Post;
