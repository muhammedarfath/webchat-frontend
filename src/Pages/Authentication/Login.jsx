import React from "react";
import { Link } from "react-router-dom";
import Support from "../../utils/Support";
import Logo from "../../Components/Logo/Logo";
import LoginForm from "../../Components/auth/LoginForm";

function Login() {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-full flex justify-center items-center">
        <div class="lg:w-3/5 flex justify-center">
          <div className="max-w-sm">
            <div class="border bg-white text-black flex flex-col justify-center items-center p-6 rounded-lg">
              <h1 className="text-2xl font-bold mb-4">fybox</h1>
              <LoginForm />
              <div class="flex items-center w-full mb-4">
                <hr class="flex-grow border-t border-gray-300" />
                <span class="mx-4">or</span>
                <hr class="flex-grow border-t border-gray-300" />
              </div>
              <button className="bg-[#1D9BF0] hover:bg-[#15a0fd] text-white p-2 rounded-md w-full mb-4">
                Login with Facebook
              </button>
              <Link to="/signup">
                <p class="text-gray-600 mb-4">
                  Don't have an account? <a class="text-[#1D9BF0]">Sign up</a>
                </p>
              </Link>
            </div>
            <div class="border p-4 bg-white rounded-lg text-center my-4 cursor-pointer">
              <span>
                Forgot your password?
                <Link to="/registeremail">
                  <a class="text-[#1D9BF0] cursor-pointer">Reset password</a>
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="hidden w-2/5 lg:flex items-center gap-6">
          <Logo width={200} height={200} />
          <h1 className="text-8xl font-bold">fybox</h1>
        </div>
      </div>
      <div className="lg:mb-2">
        <Support />
      </div>
    </div>
  );
}

export default Login;
