import React, { useEffect, useState } from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import { useSelector } from "react-redux";
import requests from "../../utils/urls";
import {
  showErrorToast,
  showPromiseToast,
  showSuccessToast,
} from "../../utils/Toaser";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function EmailVerifiedModal({ isOpen, onClose }) {
  const { email } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const resendOtp = async (e) => {
    try {
      const response = await axios.post(`${requests.resendOtp}`, {
        email: email,
      });
      navigate("/otp", { state: { email } });
    } catch (err) {
      showErrorToast(err.response?.data?.message || "An error occurred");
    }
  };

  const savePost = () => {
    showPromiseToast(
      resendOtp(),
      "Loading...",
      "OTP resent successfully!",
      "Failed to resend OTP"
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="flex" size="5xl">
      <ModalContent className="flex flex-col items-center">
        <div className="lg:w-1/2 flex flex-col items-center p-9">
          <h1 className="font-bold">Email Verification Faild</h1>
          <img src="/images/Animation.gif" alt="" />
          <span className="font-bold">OTP</span>
        </div>
        <div className="lg:w-1/2 flex flex-col gap-5 items-center justify-center">
          <span className="text-red-500 text-center">
            Please verify your email to explore all Fybox features.
          </span>
          <div className="flex m-4">
            <button
              onClick={savePost}
              className="border-2 bg-black text-white rounded-2xl p-4"
            >
              OTP VALIDATION
            </button>
            <Link to="/profile-settings">
              <button className="border-2 bg-black text-white rounded-2xl p-4">
                CHANGE EMAIL
              </button>
            </Link>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

export default EmailVerifiedModal;
