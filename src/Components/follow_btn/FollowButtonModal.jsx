import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
  } from "@nextui-org/react";
import AvatarProfile from "../avatar/Avatar_profile";
import requests from "../../utils/urls";
import axios from "axios";
import { useSelector } from "react-redux";
import { showErrorToast } from "../../utils/Toaser";
  
function FollowButtonModal({isOpen,onClose,follow_user_image,follow_user_username,followUser,setFollowStatus}) {

    const current_userId = useSelector((state) => state.auth.user_id);
    const handleUnfollow = async (e) => {
        try {
          const response = await axios.post(`${requests.sendFollowRequest}`, {
            current_user: current_userId,
            follow_user: followUser,
          });
          if (response.data.message === "Unfollowed successfully") {
            setFollowStatus("");
            onClose()
          } else if (response.data.message === "User Already following") {
            setFollowStatus("followback");
            onClose()
          } else {
            showErrorToast("Something went wrong")
            onClose()
          }
        } catch (error) {
          showErrorToast("somthing went wrong",error)
        }
      };

  return (
    <Modal backdrop="opaque" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center flex-col gap-1">
              <AvatarProfile username={follow_user_username} image={follow_user_image} size="2xl"/>
              <span>arfath</span>
            </ModalHeader>
            <ModalBody className="list-none text-center">
             <li className="border-b-1 hover:bg-gray-200 rounded p-3">Add to Close Friends list</li>
             <li className="border-b-1 hover:bg-gray-200 rounded p-3">Mute</li>
             <li className="border-b-1 hover:bg-gray-200 rounded p-3" onClick={handleUnfollow} >Unfollow</li>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default FollowButtonModal;
