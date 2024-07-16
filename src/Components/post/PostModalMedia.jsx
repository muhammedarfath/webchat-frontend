import React, { useState } from "react";
import { backendUrl } from "../../Constants/Constants";
import LikeSVG from "./Likesvg";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle } from "react-icons/tb";
import { RiShare2Line } from "react-icons/ri";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

function PostModalMedia({selectedPost,likes,liked,handleClick,handlefavorites,fav}) {
const isImage = (mediaFile) => {
    const extension = mediaFile.split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "bmp"].includes(extension);
  };
  return (
    <div className="flex w-full md:w-1/2 lg:w-1/2 flex-col bg-black">
      {selectedPost.media_file ? (
        isImage(selectedPost.media_file) ? (
          <img
            src={`${backendUrl}${selectedPost.media_file}`}
            alt={`Image ${selectedPost.id}`}
            className="w-full h-[90%] object-contain"
          />
        ) : (
          <video
            controls
            autoPlay
            muted
            src={`${backendUrl}${selectedPost.media_file}`}
            className="w-full h-[90%] object-contain"
          />
        )
      ) : (
        <img
          src={`${backendUrl}${selectedPost.picture}`}
          alt={`Image ${selectedPost.id}`}
          className="w-full h-[90%] object-contain"
        />
      )}
      <div className="w-full justify-center items-end">
        {liked && <LikeSVG />}
      </div>
      <div className="flex w-full justify-center">
        <div className="flex flex-col mr-9 mt-3 text-white items-center">
          {liked ? (
            <FcLike
              onClick={handleClick}
              className="text-white border-none p-2 w-9 h-9 font-bold text-2xl cursor-pointer"
            />
          ) : (
            <AiOutlineHeart
              onClick={handleClick}
              className="text-white border-none p-2 w-9 h-9 font-bold text-2xl cursor-pointer"
            />
          )}
          <small>{likes}</small>
        </div>
        <div className="flex flex-col mr-9 mt-3 text-white items-center">
          <TbMessageCircle className="text-white border-none p-2 w-9 h-9 font-bold text-4xl cursor-pointer" />
          <small>0</small>
        </div>
        <div className="flex flex-col mr-9 mt-3 text-white items-center">
          <RiShare2Line className="text-white border-none p-2 w-9 h-9 font-bold text-4xl cursor-pointer" />
          <small>0</small>
        </div>
        <div className="flex flex-col mr-9 mt-3 text-white items-center">
          {fav ? (
            <BsBookmarkFill
              onClick={handlefavorites}
              className="text-white border-none p-2 w-9 h-9 font-bold text-4xl cursor-pointer"
            />
          ) : (
            <BsBookmark
              onClick={handlefavorites}
              className="text-white border-none p-2 w-9 h-9 font-bold text-4xl cursor-pointer"
            />
          )}
          <small>0</small>
        </div>
      </div>
    </div>
  );
}

export default PostModalMedia;
