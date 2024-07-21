import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/Toaser";
import axios from "axios";
import requests from "../../utils/urls";

function OtpForm({loading,setLoading,email}) {

  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  
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
        showSuccessToast(
          response.data.message || "OTP verified successfully, Please Login"
        );
      } else {
        showErrorToast(response.data.message || "OTP verification failed");
      }
    } catch (err) {
      showErrorToast(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="otp-form" onSubmit={verifyOtp}>
      <div className="flex items-center justify-center gap-3 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            className="lg:w-14 lg:h-14 w-8 h-8 text-center text-2xl font-extrabold border-2 bg-white text-[#1D9BF0] hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100"
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
  );
}

export default OtpForm;
