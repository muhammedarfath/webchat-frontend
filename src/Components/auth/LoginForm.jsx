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
            authTokens: data.user_data.tokens,
            user_id: data.user_id,
            username: data.username,
            email: data.user_email,
            is_superuser: data.is_superuser,
            is_email_verified:data.is_email_verified,
            full_name:data.profile.full_name,
            image:data.profile.image,
            bio:data.profile.bio
          })
        );
        showSuccessToast(data.message);
        console.log(data);
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
          className="input-style placeholder-gray-700"
        />
      </div>
      <div class="w-full mb-4">
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="input-style placeholder-gray-700"
        />
      </div>
      <button
        type="submit"
        className="bg-white text-[#1D9BF0] hover:bg-[#eaf5fb] p-2 border-2 flex justify-center items-center rounded-md w-full"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
