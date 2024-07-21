import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { showErrorToast, showSuccessToast } from "../../utils/Toaser";
import requests from "../../utils/urls";

function RegisterEmail() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleverifyemail = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${requests.resetPassword}`, {
        email: data.email,
      });
      if (response.data) {
        showSuccessToast(response.data.message);
      } else {
        showErrorToast("Request faild");
      }
    } catch (error) {
      showErrorToast("Request faild", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-[32rem] border-1 m-4 text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter Your Registered Email ID.
          </p>
        </header>
        <form id="otp-form" onSubmit={handleSubmit(handleverifyemail)}>
          <div>
            <input
              type="text"
              className="border placeholder-gray-700 border-gray-300 p-2 rounded-md w-full mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
              placeholder="Enter your mail"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="mx-auto mt-4">
            <button
              type="submit"
              className="bg-white text-[#1D9BF0] hover:bg-[#eaf5fb] p-2 border-2 flex justify-center items-center rounded-md w-full"
            >
              {loading && (
                <CgSpinner className="text-black text-2xl animate-spin" />
              )}
              <span>{loading ? "Verifying..." : "Verify Account"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterEmail;
