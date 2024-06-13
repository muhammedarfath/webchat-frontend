import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { signUpUser } from "../../Redux/auth/authSlice";

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [usernameError, setUsernameError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/users_auth/signup/", {
        email: data.email,
        phone: data.phone,
        profile: { full_name: data.fullname },
        username: data.username,
        password: data.password,
      });
      if (response.status === 201) {
        const userData = response.data;
        dispatch(signUpUser({ user_id: userData }));
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.log(error.response.data);
      alert("Signup failed");
    }
  };

  const checkUsername = async (username) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/users_auth/check_username/?username=${username}`);
      if (response.data.exists) {
        setUsernameError("Username is already taken");
      } else {
        setUsernameError("");
      }
    } catch (error) {
      console.log(error);
      setUsernameError("Error checking username");
    }
  };

  return (
    <div className="w-full p-5 flex flex-col justify-center items-center">
      <div className="border bg-white max-w-sm text-black flex flex-col justify-center items-center p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">One TAP</h1>
        <h2 className="text-center mb-4">
          Signup with Facebook to find your Facebook friends
        </h2>
        <button className="bg-blue-600 text-white p-2 rounded-md w-full mb-4">
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
          {errors.email && <span className="text-red-500">Email is required</span>}

          <input
            type="text"
            placeholder="Phone"
            {...register("phone", { required: true })}
            className="border border-black p-2 rounded-md w-full mb-3"
          />
          {errors.phone && <span className="text-red-500">Phone is required</span>}

          <input
            type="text"
            placeholder="Full Name"
            {...register("fullname", { required: true })}
            className="border border-black p-2 rounded-md w-full mb-3"
          />
          {errors.fullname && <span className="text-red-500">Full Name is required</span>}

          <input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: true,
              validate: async (value) => {
                await checkUsername(value);
                return usernameError === "";
              }
            })}
            className={`border border-black p-2 rounded-md w-full mb-3 ${
              usernameError ? "border-red-500" : ""
            }`}
          />
          {usernameError && <span className="text-red-500">{usernameError}</span>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="border border-black p-2 rounded-md w-full mb-3"
          />
          {errors.password && <span className="text-red-500">Password is required</span>}

          <div className="text-center my-4">
            <span className="block mb-2">
              Enter your username and password to create a new account.
            </span>
            <span>
              Get the app from the Microsoft Store or download the Instagram APK
              for Android from Google Play Store.
            </span>
          </div>

          <button className="bg-blue-500 text-white p-2 rounded-md w-full">
            Sign Up
          </button>
        </form>
      </div>

      <div className="border p-4 mt-6 bg-white rounded-lg w-full max-w-sm text-center">
        <span>
          Do you have an account?{" "}
          <Link to="/login">
            <a className="text-blue-500">Login</a>
          </Link>
        </span>
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-600 gap-4 flex">
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
          <span className="inline-block mx-1">© 2024 OneTap from MA</span>{" "}
          &middot;
          <span className="inline-block mx-1">
            Contact uploading and non-users
          </span>{" "}
          &middot;
          <span className="inline-block mx-1">MA Verified</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
