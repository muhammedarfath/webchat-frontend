import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import requests from "../../utils/urls";
import { showErrorToast, showSuccessToast } from "../../utils/Toaser";
import Logo from "../../Components/Logo/Logo";
import OtpForm from "../../Components/auth/OtpForm";

function Otp() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { email } = location.state || {};

  const resendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${requests.resendOtp}`, {
        email: email,
      });
      showSuccessToast(response.data.message || "OTP resent successfully");
    } catch (err) {
      showErrorToast(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-row justify-evenly">
      <div className="flex flex-col w-full  items-center justify-center">
        <div className="lg:max-w-md max-w-xs mx-auto text-center bg-white border-2 px-4 sm:px-8 py-10 rounded-xl shadow">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Verification</h1>
            <p className="text-[15px] text-slate-500">
              Enter the 6-digit verification code that was sent to your phone
              number.
            </p>
          </header>
          <OtpForm loading={loading} setLoading={setLoading} email={email}/>
          <div className="text-sm text-slate-500 mt-4 cursor-pointer">
            Didn't receive code?{" "}
            <a
              onClick={resendOtp}
              href="#0"
              className="font-medium text-[#1D9BF0] hover:text-gray-400"
            >
              Resend
            </a>
          </div>
        </div>
        <div className="w-96">
          <div className="text-center mt-6">
            <p className="text-gray-600 text-start">
              <span className="font-bold">Note:</span> Please verify your
              account in order to explore FYBOX. If your account is not
              verified, you won't be able to access FYBOX.
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-6 p-16">
        <Logo width={200} height={200} />
        <h1 className="text-8xl font-bold">fybox</h1>
      </div>
    </div>
  );
}

export default Otp;
