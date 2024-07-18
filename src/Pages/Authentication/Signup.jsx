import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import Logo from "../../Components/Logo/Logo";
import SignupForm from "../../Components/auth/SignupForm";
import Support from "../../utils/Support";

function Signup() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full mt-2 flex justify-evenly items-center">
        <div className="w-3/5 h-4/6 flex flex-col justify-center items-center">
              <div className="border bg-white max-w-sm text-black flex flex-col justify-center items-center p-6 rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">𝖋𝖞𝖇𝖔𝖝</h1>
                <h6 className="text-center mb-4">
                  Signup with Facebook to find your Facebook friends
                </h6>
                <button className="bg-[#1D9BF0] hover:bg-[#15a0fd] text-white p-2 rounded-md w-full mb-4">
                  Login with Facebook
                </button>
                <div className="flex items-center w-full my-4">
                  <hr className="flex-grow border-t border-black" />
                  <span className="px-4">or</span>
                  <hr className="flex-grow border-t border-black" />
                </div>
                <SignupForm/>
              </div>
              <div className="border p-4 mt-2 bg-white rounded-lg w-full max-w-sm text-center">
                <span>
                  Do you have an account?{" "}
                  <Link to="/login" className="text-[#1D9BF0]">
                    Login
                  </Link>
                </span>
              </div>
        </div>
        <div className="hidden w-2/5 lg:flex items-center gap-6">
          <Logo width={200} height={200} />
          <h1 className="text-8xl font-bold">𝖋𝖞𝖇𝖔𝖝</h1>
        </div>
      </div>
      <div><Support/></div>
    </div>
  );
}

export default Signup;
