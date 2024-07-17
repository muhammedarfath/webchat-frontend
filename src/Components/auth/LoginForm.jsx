import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/Toaser";
import requests from "../../utils/urls";
import { loginUser } from "../../Redux/auth/authSlice";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${requests.loginUser}`, {
        username,
        password,
      });
      if (response.status === 200) {
        const data = response.data;
        dispatch(
          loginUser({
            authTokens: data.access,
            user_id: data.user_id,
            username: data.username,
            email: data.user_email,
            is_superuser: data.is_superuser,
          })
        );
        showSuccessToast(data.message);
        navigate("/");
      } else {
        showErrorToast("somthing went wrong");
      }
    } catch (error) {
      showErrorToast("somthing went wrong", error);
    }
  };

  return (
    <form onSubmit={handlesubmit} className="w-full">
      <div class="w-full mb-4">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          class="border placeholder-gray-700 border-gray-300 p-2 rounded-md w-full mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        />
      </div>
      <div class="w-full mb-4">
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          class="border placeholder-gray-700 border-gray-300 p-2 rounded-md w-full mb-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        />
      </div>
      <button
        type="submit"
        class="bg-white text-[#1D9BF0] hover:bg-[#eaf5fb] p-2 border-2 flex justify-center items-center rounded-md w-full"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
