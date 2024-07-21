import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import requests from "../../utils/urls";
import { showErrorToast, showSuccessToast } from "../../utils/Toaser";

function PasswordResetConfirmForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user_id } = useParams();

  const handlchangepassword = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${requests.passwordResetConfirm}${user_id}/`,
        {
          password: data.password,
        }
      );
      showSuccessToast(response.data.message);
      navigate("/login");
    } catch (error) {
      showErrorToast("somthing went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-[32rem] m-4 text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Enter Your New Password</h1>
          <p className="text-[15px] text-slate-500">Enter Your Password.</p>
        </header>
        <form id="otp-form" onSubmit={handleSubmit(handlchangepassword)}>
          <div>
            <input
              type="password"
              className="border placeholder-gray-700 border-gray-300 p-2 rounded-md w-full mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">password is required</span>
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
              <span>{loading ? "Changing..." : "Change"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetConfirmForm;
