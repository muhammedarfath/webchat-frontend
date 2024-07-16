import React, { useState } from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { showErrorToast } from "../../utils/Toaser";
import requests from "../../utils/urls";
import PostModalMedia from "./PostModalMedia";
import PostModalContent from "./PostModalContent";

const PostModal = ({ isOpen, onClose, selectedPost }) => {
  const [likes, setLikes] = useState(selectedPost.likes);
  const { username } = useSelector((state) => state.auth);
  const [liked, setLiked] = useState(selectedPost.is_liked);
  const [fav, setFav] = useState(selectedPost.is_faved);

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${requests.likePost}${selectedPost.id}/`,
        { username: username }
      );
      if (response.data) {
        setLikes(response.data.post.likes);
        setLiked(!liked);
      } else {
        showErrorToast("Something went wrong")
      }
    } catch (error) {
      showErrorToast("Something went wrong",error)
    }
  };

  const handlefavorites = async () => {
    try {
      const response = await axios.post(
        `${requests.savePost}${selectedPost.id}/`,
        { username: username }
      );
      if (response.data) {
        setFav(!fav);
      } else {
        showErrorToast("Something went wrong")
      }
    } catch (error) {
      showErrorToast("Something went wrong",error)
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="flex h-screen" size="full">
      <ModalContent className="flex flex-row">
         <PostModalMedia selectedPost={selectedPost} likes={likes} liked={liked} handleClick={handleClick} handlefavorites={handlefavorites} fav={fav}/>
        <PostModalContent selectedPost={selectedPost} />
      </ModalContent>
    </Modal>
  );  
};

export default PostModal;
