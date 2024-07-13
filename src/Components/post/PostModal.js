import React from 'react';
import {
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { FaRegHeart } from 'react-icons/fa';
import { VscLiveShare } from 'react-icons/vsc';
import { MdSaveAlt } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Avatar_profile from '../avatar/Avatar_profile';

const PostModal = ({ isOpen, onClose, selectedPost }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="flex h-full lg:h-auto xl:auto md:h-auto sm:h-auto" size="3xl">
      <ModalContent className="flex flex-row">
        <div>
          <img
            src={`http://127.0.0.1:8000${selectedPost.picture}`}
            alt="Selected"
            className="w-full lg:h-auto h-full rounded-lg"
          />
        </div>
        <div className="lg:block md:block sm:block hidden gap-5 pt-7 pl-2 mt-4">
          <div className="flex gap-x-64">
            <div className="flex gap-2">
              <Avatar_profile image={selectedPost.user.image} username={selectedPost.user.username}/>
              <h1>{selectedPost.user.username}</h1>
            </div>
            <BsThreeDots className="mr-3" />
          </div>
          <hr className="w-full mt-2" />
          {selectedPost.caption ? (
            <div className="h-96">
              <div className="flex gap-3">
              <Avatar_profile image={selectedPost.picture} username={selectedPost.user.username}/>
                <h5>{selectedPost.caption}</h5>
              </div>
              <div className="mt-2">
                {selectedPost.tags.map((tag) => (
                  <Link to={`/tags/${tag.title}`} key={tag.id} className="mr-2">#{tag.title}</Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-96">
              <h5>No Comment Yet</h5>
            </div>
          )}
          <hr className="w-full mt-28" />
          <div className="absolute bottom-5 gap-x-56 flex justify-between">
            <div className="flex gap-4 pl-3">
              <FaRegHeart className="text-black font-bold text-2xl cursor-pointer" />
              <VscLiveShare className="text-black font-bold text-2xl cursor-pointer" />
            </div>
            <div className="flex">
              <MdSaveAlt className="text-black font-bold text-2xl cursor-pointer" />
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
