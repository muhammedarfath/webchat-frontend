import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

function RegisterEmail() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const handleverifyemail = async (data) =>{
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/users_auth/reset-password/", {
              email: data.email,
            });
            if (response.data) {
                console.log(response.data);
            } else {
              console.log("faild");
            }
          } catch (error) {
            console.log(error.response.data);
       
        }
    }



  return (

        <div className="flex justify-center items-center h-screen w-full">
            <div className="w-[32rem] m-4 text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
            <p className="text-[15px] text-slate-500">
                Enter Your Registered Email ID.
            </p>
            </header>
            <form id="otp-form" onSubmit={handleSubmit(handleverifyemail)}>
            <div>
                <input type="text"
                  className="border border-black p-2 rounded-md w-full"
                  placeholder='Enter your mail'
                  {...register("email", { required: true })}
                  />
                  {errors.email && <span className="text-red-500">Email is required</span>}
            </div>
            <div className="mx-auto mt-4">
                <button
                type="submit"
                className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#E9E9E9] text-black hover:bg-[#d5d5d5] px-3.5 py-2.5 text-sm font-medium shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
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

  )
}

export default RegisterEmail
