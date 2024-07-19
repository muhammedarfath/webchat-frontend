import React, { useContext, useState } from "react";
import AvatarProfile from "../avatar/Avatar_profile";
import { Textarea } from "@nextui-org/react";
import { HiOutlineGif } from "react-icons/hi2";
import { GrEmoji } from "react-icons/gr";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { showErrorToast, showSuccessToast } from "../../utils/Toaser";
import axios from "axios";
import requests from "../../utils/urls";
import { useSelector } from "react-redux";
import { PostContext } from "./PostProvider";

function Comment() {
  const { selectedPost, setSelectedPost } = useContext(PostContext);
  const [comment, setComment] = useState("");
  const { username } = useSelector((state) => state.auth);

  const handlecomment = async () => {
    try {
      const response = await axios.post(`${requests.commentPost}${username}/`, {
        post_id: selectedPost.id,
        comment: comment,
      });
      if (response.status === 200) {
        setSelectedPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, response.data],
        }));
        showSuccessToast("Comment added successfully");
      }
    } catch (err) {
      showErrorToast("Something went wrong", err);
    }
  };

  return (
    <div className="h-32 w-full border-b-1 ">
      <div className="flex justify-between p-2">
        <div className="flex gap-2 w-full">
          <AvatarProfile
            size="lg"
            image={selectedPost.user.image}
            username={selectedPost.user.username}
          />
          <Textarea onChange={(e) => setComment(e.target.value)} placeholder="Write your comment here..." />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex ml-14 gap-3">
          <HiOutlineGif className="text-xl" />
          <GrEmoji className="text-xl" />
          <MdOutlinePhotoSizeSelectActual className="text-xl" />
        </div>
        <button onClick={handlecomment} className="px-6 py-1 mr-5 bg-gray-950 text-white text-sm rounded-xl">
          Reply
        </button>
      </div>
    </div>
  );
}

export default Comment;
