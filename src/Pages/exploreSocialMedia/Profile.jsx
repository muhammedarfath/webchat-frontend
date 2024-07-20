import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { SiCodefactor } from "react-icons/si";
import { BsPostcardHeart } from "react-icons/bs";
import { useDisclosure } from "@nextui-org/react";
import PostModal from "../../Components/post/PostModal";
import requests from "../../utils/urls";
import ProfileDetails from "../../Components/profile/ProfileDetails";
import { showErrorToast } from "../../utils/Toaser";
import ProfilePosts from "../../Components/profile/ProfilePosts";

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState();
  const current_user = useSelector((state) => state.auth.username);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          `${requests.fetchUserProfile}`,
          {
            username: username,
            current_user: current_user,
          }
        );
        const data = response.data;
        setUser(data);
      } catch (error) {
        showErrorToast("Error fetching user:", error)
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);


  const handleOpen = (post) => {
    setSelectedPost(post);
    onOpen();
  };

  return (
    <>
      {user && (
        <div className="w-full flex flex-col overflow-auto gap-10">
          <ProfileDetails user={user} username={username} current_user={current_user}/>
          <div className="flex justify-center items-center gap-5 w-full sticky top-0 bg-white shadow-sm p-4">
            <BsPostcardHeart className="text-2xl cursor-pointer" />
            <SiCodefactor className="text-2xl cursor-pointer" />
          </div>
          <ProfilePosts user={user} handleOpen={handleOpen}/>
          {selectedPost && (
            <PostModal isOpen={isOpen} onClose={onClose} selectedPost={selectedPost} loading={loading} />
          )}
        </div>
      )}
    </>
  );
}

export default Profile;
