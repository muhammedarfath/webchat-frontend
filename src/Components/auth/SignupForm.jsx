import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { CgSpinner } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../Redux/auth/authSlice";
import axios from "axios";
import requests from "../../utils/urls";
import { showErrorToast, showSuccessToast } from "../../utils/Toaser";
import { useNavigate } from "react-router-dom";

function  SignupForm() {
    const dispatch = useDispatch();
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const {register,handleSubmit,formState: { errors },} = useForm();
    const navigate = useNavigate();
    
    const onSubmit = async (data) => {
        setLoading(true);
        try {
          const response = await axios.post(
            `${requests.signupUser}`,
            {
              email: data.email,
              phone: `+${phone}`,
              profile: {
                full_name: data.fullname,
                date_of_birth: data.date_of_birth,
              },
              username: data.username,
              password: data.password,
            }
          );
          if (response.status === 201) {
            const userData = response.data;
            dispatch(signUpUser({ user_id: userData.id,full_name:userData.profile.full_name}));
            showSuccessToast("OTP Sent Your Email")
            navigate('/otp', { state: { email: response.data.email } });
          } 
        } catch (error) {
          showErrorToast("Username or email already exists", error)
          setLoading(false);
        }
      };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <input
        type="text"
        placeholder="Email"
        {...register("email", { required: true })}
        className="border placeholder-gray-700 border-gray-300 p-2 rounded-md w-full mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      "
      />
      {errors.email && <span className="text-red-500">Email is required</span>}
      <PhoneInput
        country={"in"}
        value={phone}
        onChange={(phone) => setPhone(phone)}
        containerClass="mb-3"
        inputClass="border placeholder-gray-700 border-gray-300 p-2 rounded-md w-full mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      />
      {errors.phone && (
        <span className="text-red-500">Phone number is required</span>
      )}
      <input
        type="text"
        placeholder="Full Name"
        {...register("fullname", { required: true })}
        className="border placeholder-gray-700 border-gray-300 p-2 rounded-md w-full mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none3"
      />
      {errors.fullname && (
        <span className="text-red-500">Full Name is required</span>
      )}
      <input
        type="text"
        placeholder="Username"
        {...register("username", { required: true })}
        className="border placeholder-gray-700 border-gray-300 p-2 rounded-md w-full mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      />
      {errors.username && (
        <span className="text-red-500">Username is required</span>
      )}
      <input
        type="date"
        placeholder="Date of Birth"
        className="border placeholder-gray-700 border-gray-300 p-2 rounded-md w-full mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        {...register("date_of_birth", { required: true })}
      />
      {errors.date_of_birth && (
        <span className="text-red-500">DOB is required</span>
      )}
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
        className="border placeholder-gray-700 border-gray-300 p-2 rounded-md w-full mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      />
      {errors.password && (
        <span className="text-red-500">Password is required</span>
      )}
      <div className="text-center my-4">
        <h6 className="block mb-2">
          Enter your username and password to create a new account.
        </h6>
      </div>
      <button className="bg-white text-[#1D9BF0] hover:bg-[#eaf5fb] p-2 border-2 flex justify-center items-center rounded-md w-full">
        {loading && <CgSpinner className="text-black text-2xl animate-spin" />}
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm;
