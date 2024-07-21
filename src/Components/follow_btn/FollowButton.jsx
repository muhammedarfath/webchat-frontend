import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import requests from "../../utils/urls";
import { IoIosArrowDown } from "react-icons/io";
import FollowButtonModal from "./FollowButtonModal";
import { useDisclosure } from "@nextui-org/react";
import { showErrorToast } from "../../utils/Toaser";

function FollowButton({
  follow_user,
  follow_user_image,
  follow_user_username,
}) {
  const current_userId = useSelector((state) => state.auth.user_id);
  const [isRequested, setIsRequested] = useState(false);
  const [followStatus, setFollowStatus] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const handleNotification = (userId) => {
  //   const socket = new WebSocket(`ws://localhost:8000/ws/notification/${userId}/`);

  //   socket.onopen = () => {
  //     console.log('WebSocket connection established');
  //     socket.send(
  //       JSON.stringify({
  //         message: `${username} has requested to follow you.`,
  //         command: "new_notify",
  //       })
  //     );
  //   };

  //   socket.onerror = (error) => {
  //     console.error('WebSocket Error: ', error);
  //   };
  // };

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await axios.get(`${requests.checkRelationShip}`, {
          params: { current_userId, follow_user },
        });
        setFollowStatus(response.data.status);
      } catch (error) {
        showErrorToast("Error fetching follow status:", error)
      }
    };
    fetchFollowStatus();
  }, [current_userId, follow_user]);

  const handleFollowBack = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`${requests.sendFollowBackRequest}`, {
        current_user: current_userId,
        follow_user: follow_user,
      });
      if (response.data.message === "Followed back successfully") {
        setFollowStatus("followed");
      } else if (response.data.message === "Already following") {
        setFollowStatus("followed");
      } else {
        showErrorToast("Something went wrong")
      }
    } catch (error) {
      showErrorToast("Something went wrong",error)
    }
  };

  const handleFollow = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`${requests.sendFollowRequest}`, {
        current_user: current_userId,
        follow_user: follow_user,
      });
      if (response.data) {
        setIsRequested(true);
      } else {
        showErrorToast("Something went wrong")
      }
    } catch (error) {
      showErrorToast("Something went wrong",error)
    }
    // handleNotification(user.id);
  };

  return (
    <div className="flex gap-3 items-end cursor-pointer">
      {followStatus === "self" ? (
        <div className="shadow-sm px-5 py-3 rounded-3xl bg-[#282828] text-white">
          <span className="font-semibold text-sm">It's You</span>
        </div>
      ) : followStatus === "following" || isRequested ? (
        <div className="shadow-sm px-5 flex items-center gap-2 py-3 rounded-3xl bg-[#282828] text-white">
          <span className="font-semibold text-sm">Following</span>
          <IoIosArrowDown className="font-bold" onClick={() => onOpen()} />
        </div>
      ) : followStatus === "followed" ? (
        <div className="shadow-sm px-5 gap-2 flex items-center py-3 rounded-3xl bg-[#282828] text-white">
          <span className="font-semibold text-sm">
            Following
          </span>
            <IoIosArrowDown className="font-bold" onClick={() => onOpen()} />
        </div>
      ) : followStatus === "followback" || isRequested ? (
        <div
          className="shadow-sm px-5 py-3 rounded-3xl bg-[#282828] text-white"
          onClick={handleFollowBack}
        >
          <span className="font-semibold text-sm">Follow Back</span>
        </div>
      ) : (
        <div
          className="shadow-sm px-5 py-3 rounded-3xl text-white hover:bg-[#d5d5d5] bg-[#1D9BF0]"
          onClick={handleFollow}
        >
          <span className="font-semibold text-sm">Follow</span>
        </div>
      )}
      <FollowButtonModal
        isOpen={isOpen}
        onClose={onClose}
        followUser={follow_user}
        follow_user_image={follow_user_image}
        follow_user_username={follow_user_username}
        setFollowStatus={setFollowStatus}
      />
    </div>
  );
}

export default FollowButton;
