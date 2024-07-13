import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { TbMessageCircle } from 'react-icons/tb';
import { VscLiveShare } from 'react-icons/vsc';
import { MdSaveAlt } from 'react-icons/md';
import Avatar_profile from '../avatar/Avatar_profile';

const Post = ({ post, handleOpen }) => {
  return (
    <div className="relative group cursor-pointer" onClick={() => handleOpen(post)}>
      <img
        src={`http://127.0.0.1:8000${post.picture}`}
        alt={`Image ${post.id}`}
        className="w-full h-auto rounded-3xl"
      />
      <div className="absolute bottom-0 text-white font-semibold left-0 rounded-3xl w-full h-full bg-black bg-opacity-30 flex items-end justify-between pr-6 pb-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="ml-4">
          <div className="flex gap-3">
            <Avatar_profile />
            <h1>{post.user.username}</h1>
          </div>
          <span className="ml-6">{post.caption}</span>
          <div className="mt-2">
            {post.tags.map((tag) => (
              <a key={tag.id} className="mr-2">#{tag.title}</a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <FaRegHeart className="text-white font-bold text-2xl cursor-pointer" />
          <TbMessageCircle className="text-white font-bold text-2xl cursor-pointer" />
          <VscLiveShare className="text-white font-bold text-2xl cursor-pointer" />
          <MdSaveAlt className="text-white font-bold text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Post;
