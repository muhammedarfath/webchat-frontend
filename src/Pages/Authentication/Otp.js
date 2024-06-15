import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
function Otp() {
  const location = useLocation();
  const { userdata } = location.state || {}; 
  const [otp, setOTP] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };




  return (
    <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="flex justify-center">
          <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
              <h1 className="text-2xl font-bold mb-1">Verification</h1>
              <p className="text-[15px] text-slate-500">
                Enter the 4-digit verification code that was sent to your phone number.
              </p>
            </header>
            <form id="otp-form">
              <div className="flex items-center justify-center gap-3 mb-4">
                <input
                  type="text"
                  className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-[#E9E9E9] border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  pattern="\d*"
                  maxLength="1"
                  value={otp}
                  onChange={handleOTPChange}
                />
                <input
                  type="text"
                  className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-[#E9E9E9] border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxLength="1"
                />
                <input
                  type="text"
                  className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-[#E9E9E9] border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxLength="1"
                />
                <input
                  type="text"
                  className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-[#E9E9E9] border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxLength="1"
                />

              </div>
              <div className="mb-4">
                <label htmlFor="dateOfBirth" className="block text-left text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                  value={dateOfBirth}
                  onChange={handleDateOfBirthChange}
                />
              </div>
              <div className=" mx-auto mt-4">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#E9E9E9] text-black hover:bg-[#d5d5d5] px-3.5 py-2.5 text-sm font-medium shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                >
                    {loading && (

                     <CgSpinner className="text-black  text-2xl animate-spin"/>
                    )}

                  <span>Verify Account</span>
                </button>
              </div>
            </form>
            <div className="text-sm text-slate-500 mt-4">
              Didn't receive code?{" "}
              <a href="#0" className="font-medium text-[#d5d5d5] hover:text-gray-400">
                Resend
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Otp;
