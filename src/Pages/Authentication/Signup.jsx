import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { signUpUser } from "../../Redux/auth/authSlice";
import { CgSpinner } from "react-icons/cg";
import { Toaster, toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Otp from "./Otp";

function Signup() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setEmail(data.email);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users_auth/signup/",
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
        dispatch(signUpUser({ user_id: userData }));
        setShowOTP(true);
        toast.success("OTP Sent Your Email");
      } else {
        toast.error("check your credentials");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Signup failed", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-5 flex flex-col justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      {showOTP ? (
        <Otp email={email} />
      ) : (
        <>
          <div className="border bg-white max-w-sm text-black flex flex-col justify-center items-center p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">One TAP</h1>
            <h6 className="text-center mb-4">
              Signup with Facebook to find your Facebook friends
            </h6>
            <button className="bg-[#E9E9E9] hover:bg-[#d5d5d5] text-black p-2 rounded-md w-full mb-4">
              Login with Facebook
            </button>

            <div className="flex items-center w-full my-4">
              <hr className="flex-grow border-t border-black" />
              <span className="px-4">or</span>
              <hr className="flex-grow border-t border-black" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <input
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
                className="border border-black p-2 rounded-md w-full mb-3"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}

              <PhoneInput
                country={"in"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                containerClass="mb-3"
                inputClass="border border-black p-2 rounded-md w-full"
              />
              {errors.phone && (
                <span className="text-red-500">Phone number is required</span>
              )}

              <input
                type="text"
                placeholder="Full Name"
                {...register("fullname", { required: true })}
                className="border border-black p-2 rounded-md w-full mb-3"
              />
              {errors.fullname && (
                <span className="text-red-500">Full Name is required</span>
              )}

              <input
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
                className="border border-black p-2 rounded-md w-full mb-3"
              />

              {errors.username && (
                <span className="text-red-500">Username is required</span>
              )}
              <input
                type="date"
                placeholder="Date of Birth"
                className="border border-black p-2 rounded-md w-full mb-3"
                {...register("date_of_birth", { required: true })}
              />
              {errors.date_of_birth && (
                <span className="text-red-500">DOB is required</span>
              )}

              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="border border-black p-2 rounded-md w-full mb-3"
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}

              <div className="text-center my-4">
                <h6 className="block mb-2">
                  Enter your username and password to create a new account.
                </h6>
                {/* <h6>
                  Get the app from the Microsoft Store or download the OneTap APK
                  for Android from Google Play Store.
                </h6> */}
              </div>

              <button className="bg-[#E9E9E9] text-black hover:bg-[#d5d5d5] p-2 flex justify-center items-center rounded-md w-full">
                {loading && (
                  <CgSpinner className="text-black text-2xl animate-spin" />
                )}
                Sign Up
              </button>

              <div className="mt-5" id="recaptcha"></div>
            </form>
          </div>

          <div className="border p-4 mt-6 bg-white rounded-lg w-full max-w-sm text-center">
            <span>
              Do you have an account?{" "}
              <Link to="/login" className="text-gray-400">
                Login
              </Link>
            </span>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600 gap-4 flex flex-wrap justify-center">
              <span className="inline-block mx-1">MA</span> &middot;
              <span className="inline-block mx-1">About</span> &middot;
              <span className="inline-block mx-1">Blog</span> &middot;
              <span className="inline-block mx-1">Jobs</span> &middot;
              <span className="inline-block mx-1">Help</span> &middot;
              <span className="inline-block mx-1">API</span> &middot;
              <span className="inline-block mx-1">Privacy</span> &middot;
              <span className="inline-block mx-1">Terms</span> &middot;
              <span className="inline-block mx-1">Locations</span> &middot;
              <span className="inline-block mx-1">Instagram Lite</span> &middot;
              <span className="inline-block mx-1">Threads</span>
            </p>
            <p className="text-gray-600">
              <span className="inline-block mx-1">English (UK)</span> &middot;
              <span className="inline-block mx-1">
                © 2024 OneTap from MA
              </span>{" "}
              &middot;
              <span className="inline-block mx-1">
                Contact uploading and non-users
              </span>{" "}
              &middot;
              <span className="inline-block mx-1">MA Verified</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Signup;
