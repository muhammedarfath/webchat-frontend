import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/auth/authSlice";
import { Toaster, toast } from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users_auth/login/",
        {
          username,
          password,
        }
      );
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
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error("somthing went wrong");
      }
    } catch (error) {
      toast.error("somthing went wrong", error);
    }
  };

  return (
    <div class="min-h-screen flex flex-col justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div class="max-w-sm">
        <div class="border bg-white text-black flex flex-col justify-center items-center p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">One TAP</h1>
          <form onSubmit={handlesubmit} className="w-full">
            <div class="w-full mb-4">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                class="border border-black p-2 rounded-md w-full"
              />
            </div>

            <div class="w-full mb-4">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                class="border border-black p-2 rounded-md w-full"
              />
            </div>

            <button
              type="submit"
              class="bg-[#E9E9E9] text-black hover:bg-[#d5d5d5] p-2 rounded-md w-full mb-4"
            >
              Login
            </button>
          </form>
          <div class="flex items-center w-full mb-4">
            <hr class="flex-grow border-t border-black" />
            <span class="mx-4">or</span>
            <hr class="flex-grow border-t border-black" />
          </div>

          <a href="#" class="mb-4 text-gray-400">
            Login with Facebook
          </a>

          <Link to="/signup">
            <p class="text-gray-600 mb-4">
              Don't have an account? <a class="text-gray-400">Sign up</a>
            </p>
          </Link>
        </div>

        <div class="border p-4 bg-white rounded-lg text-center my-4 cursor-pointer">
          <span>
            Forgot your password?
            <Link to="/registeremail">
              <a class="text-gray-400 cursor-pointer">Reset password</a>
            </Link>
          </span>
        </div>
      </div>
      <div class="text-center">
        <p class="text-gray-600 mb-4 gap-4 flex">
          <span class="inline-block mx-1">MA</span> &middot;
          <span class="inline-block mx-1">About</span> &middot;
          <span class="inline-block mx-1">Blog</span> &middot;
          <span class="inline-block mx-1">Jobs</span> &middot;
          <span class="inline-block mx-1">Help</span> &middot;
          <span class="inline-block mx-1">API</span> &middot;
          <span class="inline-block mx-1">Privacy</span> &middot;
          <span class="inline-block mx-1">Terms</span> &middot;
          <span class="inline-block mx-1">Locations</span> &middot;
          <span class="inline-block mx-1">Instagram Lite</span> &middot;
          <span class="inline-block mx-1">Threads</span>
        </p>
        <p class="text-gray-600">
          <span class="inline-block mx-1">English (UK)</span> &middot;
          <span class="inline-block mx-1">© 2024 OneTap from MA</span> &middot;
          <span class="inline-block mx-1">
            Contact uploading and non-users
          </span>{" "}
          &middot;
          <span class="inline-block mx-1">MA Verified</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
