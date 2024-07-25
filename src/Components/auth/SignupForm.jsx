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

function SignupForm() {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
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
      console.log(response.data,"signup dataaa");
      if (response.status === 201) {
        const userData = response.data;
        dispatch(signUpUser({ authTokens: userData.user_data.tokens, full_name: userData.profile.full_name }));
        showSuccessToast("OTP Sent Your Email");
        navigate('/otp', { state: { email: response.data.user_data.user.email } });
      }
    } catch (error) {
      showErrorToast("Username or email already exists", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <input
        type="text"
        placeholder="Email"
        {...register("email", { required: true })}
        className="input-style placeholder-gray-700"
      />
      {errors.email && <span className="error-message">Email is required</span>}
      <PhoneInput
        country={"in"}
        value={phone}
        onChange={(phone) => setPhone(phone)}
        containerClass="mb-3"
        inputClass="input-style placeholder-gray-700"
      />
      {errors.phone && (
        <span className="error-message">Phone number is required</span>
      )}
      <input
        type="text"
        placeholder="Full Name"
        {...register("fullname", { required: true })}
        className="input-style placeholder-gray-700"
      />
      {errors.fullname && (
        <span className="error-message">Full Name is required</span>
      )}
      <input
        type="text"
        placeholder="Username"
        {...register("username", { required: true })}
        className="input-style placeholder-gray-700"
      />
      {errors.username && (
        <span className="error-message">Username is required</span>
      )}
      <input
        type="date"
        placeholder="Date of Birth"
        className="input-style"
        {...register("date_of_birth", { required: true })}
      />
      {errors.date_of_birth && (
        <span className="error-message">DOB is required</span>
      )}
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
        className="input-style placeholder-gray-700"
      />
      {errors.password && (
        <span className="error-message">Password is required</span>
      )}
      <div className="text-center my-4">
        <h6 className="block mb-2 placeholder-gray-700">
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
