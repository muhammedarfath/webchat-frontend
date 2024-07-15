import React, { useState } from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import { FaRegHeart } from "react-icons/fa";
import { RiShare2Line } from "react-icons/ri";
import { MdSaveAlt } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import Avatar_profile from "../avatar/Avatar_profile";
import { useSelector } from "react-redux";
import axios from "axios";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle } from "react-icons/tb";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import LikeSVG from "./Likesvg";

const PostModal = ({ isOpen, onClose, selectedPost }) => {
  const [likes, setLikes] = useState(selectedPost.likes);
  const { username } = useSelector((state) => state.auth);
  const [liked, setLiked] = useState(selectedPost.is_liked);
  const [fav, setFav] = useState(selectedPost.is_faved);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const isImage = (mediaFile) => {
    const extension = mediaFile.split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "bmp"].includes(extension);
  };
  const toggleTags = (e) => {
    e.stopPropagation();
    setShowAllTags(!showAllTags);
  };

  const toggleCaption = (e) => {
    e.stopPropagation();
    setShowFullCaption(!showFullCaption);
  };

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/posts/like-post/${selectedPost.id}/`,
        {
          username: username,
        }
      );
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

  const handlefavorites = async (e) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/posts/fav-post/${selectedPost.id}/`,
        {
          username: username,
        }
      );
      if (response.data) {
        setFav(!fav);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Format the posted date and time
  const formatDate = (dateTimeString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const date = new Date(dateTimeString);
    const timeFormatted = date.toLocaleTimeString("en-US", options);
    const dateFormatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${timeFormatted} · ${dateFormatted}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex h-full lg:h-auto xl:auto md:h-auto sm:h-auto"
      size="5xl"
      hideCloseButton
    >
      <ModalContent className="flex flex-row">
        <div className="flex lg:w-1/2 flex-col bg-black">
          {selectedPost.media_file ? (
            isImage(selectedPost.media_file) ? (
              <img
                src={`http://127.0.0.1:8000${selectedPost.media_file}`}
                alt={`Image ${selectedPost.id}`}
                className="w-full h-auto rounded-3xl"
              />
            ) : (
              <video
                controls
                autoPlay
                muted
                src={`http://127.0.0.1:8000${selectedPost.media_file}`}
                className="w-full h-auto rounded-3xl"
              />
            )
          ) : (
            <img
              src={`http://127.0.0.1:8000${selectedPost.picture}`}
              alt={`Image ${selectedPost.id}`}
              className="w-full h-auto rounded-3xl"
            />
          )}
          <div className="w-full justify-center items-end">
            {liked && <LikeSVG />}
          </div>
          <div className="flex w-full justify-evenly gap-9">
            <div className="flex flex-col text-white items-center">
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
            <div className="flex flex-col text-white items-center">
              <TbMessageCircle className="text-white border-none p-2 w-9 h-9 font-bold text-4xl cursor-pointer" />
              <small>0</small>
            </div>
            <div className="flex flex-col text-white items-center">
              <RiShare2Line className="text-white border-none p-2 w-9 h-9 font-bold text-4xl cursor-pointer" />
              <small>0</small>
            </div>
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
          </div>
        </div>

        <div className="lg:block md:block lg:w-1/2 sm:block hidden flex-1 gap-5 pl-2 mt-4">
          <div className="flex justify-between gap-x-64">
            <div className="flex flex-col w-full">
              <div className="flex gap-2 items-center">
                <Avatar_profile
                  image={selectedPost.user.image}
                  username={selectedPost.user.username}
                />
                <h1>{selectedPost.user.username}</h1>
              </div>
              {selectedPost.caption && (
                <div className="ml-9 w-full">
                  {showFullCaption ? (
                    <span>{selectedPost.caption}</span>
                  ) : (
                    <span>{selectedPost.caption.slice(0, 100)}</span>
                  )}
                  {selectedPost.caption.length > 100 && (
                    <button
                      className="text-blue-500 ml-1"
                      onClick={toggleCaption}
                    >
                      {showFullCaption ? "See less..." : "See more..."}
                    </button>
                  )}
                </div>
              )}
              <div className="ml-9 w-full">
                {selectedPost.tags
                  .slice(0, showAllTags ? undefined : 3)
                  .map((tag) => (
                    <a key={tag.id} className="text-[#1D9BF0]">
                      {tag.title}
                    </a>
                  ))}
                {selectedPost.tags.length > 3 && (
                  <button className="text-blue-500 ml-1" onClick={toggleTags}>
                    {showAllTags ? "Show less..." : `Show all`}
                  </button>
                )}
              </div>
              <h1 className="ml-8 w-full text-[#536471]">
                {formatDate(selectedPost.posted)}
              </h1>
            </div>
            <BsThreeDots className="mr-3 text-4xl" />
          </div>
          <hr className="w-full mt-2" />

          <div className="flex justify-center items-center h-96">
            <h5>No Comment Yet</h5>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
