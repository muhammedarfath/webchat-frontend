import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";
import requests from "../../utils/urls";
import { showErrorToast, showSuccessToast } from "../../utils/Toaser";
import Logo from "../../Components/Logo/Logo";

function Otp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const location = useLocation();
  const { email } = location.state || {};

  const handleOTPChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const sanitisedOtp = Number(otp.join(""));
    try {
      const response = await axios.post(`${requests.verifyOtp}`, {
        email: email,
        otp: sanitisedOtp,
      });
      if (response.status === 200) {
        navigate("/login");
        showSuccessToast(response.data.message || "OTP verified successfully, Please Login");
      } else {
        showErrorToast(response.data.message || "OTP verification failed");
      }
    } catch (err) {
      showErrorToast(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="w-full h-full mt-9 flex justify-evenly">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white border-2 px-4 sm:px-8 py-10 rounded-xl shadow">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Verification</h1>
            <p className="text-[15px] text-slate-500">
              Enter the 6-digit verification code that was sent to your phone
              number.
            </p>
          </header>
          <form id="otp-form" onSubmit={verifyOtp}>
            <div className="flex items-center justify-center gap-3 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-14 h-14 text-center text-2xl font-extrabold border-2 bg-white text-[#1D9BF0] hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOTPChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            <div className="mx-auto mt-4">
              <button
                type="submit"
                className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-white text-[#1D9BF0] hover:bg-[#eaf5fb] border-2 px-3.5 py-2.5 text-sm font-medium shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
              >
                {loading && (
                  <CgSpinner className="text-black text-2xl animate-spin" />
                )}
                <span>{loading ? "Verifying..." : "Verify Account"}</span>
              </button>
            </div>
          </form>
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
      <div className="hidden lg:flex items-center gap-6">
        <Logo width={200} height={200} />
        <h1 className="text-8xl font-bold">𝖋𝖞𝖇𝖔𝖝</h1>
      </div>
    </div>
  );
}

export default Otp;
