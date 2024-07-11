import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";

function Otp({email}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  console.log(email);

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
    const sanitisedOtp = Number( otp.join(""))
    try {
      const response = await axios.post("http://127.0.0.1:8000/users_auth/verify-otp/",{
        email:email,
        otp:sanitisedOtp
      });
      if (response.data){
        console.log(response.data);
      }
      navigate("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const resendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const response = await axios.post("http://127.0.0.1:8000/users_auth/resend-otp/",{
        email:email
      })
      if (response.data){
        console.log(response.data);
      }
    }catch(err){
      console.log(err);
    }
  } 



  return (
    <div className="flex justify-center">
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
    <header className="mb-8">
      <h1 className="text-2xl font-bold mb-1">Verification</h1>
      <p className="text-[15px] text-slate-500">
        Enter the 6-digit verification code that was sent to your phone number.
      </p>
    </header>
    <form id="otp-form" onSubmit={verifyOtp}>
      <div className="flex items-center justify-center gap-3 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-[#E9E9E9] border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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
          className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#E9E9E9] text-black hover:bg-[#d5d5d5] px-3.5 py-2.5 text-sm font-medium shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
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
      <a onClick={resendOtp} href="#0" className="font-medium text-[#d5d5d5] hover:text-gray-400">
        Resend
      </a>
    </div>
  </div>
  </div>
  );
}

export default Otp;
