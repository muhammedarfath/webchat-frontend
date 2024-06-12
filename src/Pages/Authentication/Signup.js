import React, { useState } from 'react'
import {Card, CardHeader, CardBody, Input,Button} from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signUpUser } from '../../Redux/auth/authSlice';

function Signup() {

   
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignup = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post('http://127.0.0.1:8000/chat/signup/',{
                username,
                email,
                password,
                password2
            })
            if (response.status === 201){
                const data = response.data;
                dispatch(signUpUser({user_id:data}))
                navigate('/login');
            }else{
                alert('Signup failed');
            }

        }catch(error){
            console.log(error)
            alert('Signup failed');
        }
        
    } 


    return (
        // <div classNameName='flex'>
        //     <div classNameName="w-2/5 h-screen flex items-center justify-center" >
    
        //         <Card classNameName="py-4 ">
        //         <form onSubmit={handleSignup}>    
        //             <CardHeader classNameName="pb-0 pt-2 px-4 flex-col items-start gap-4">
        //                 <p classNameName="uppercase font-bold  text-2xl">Login</p>
        //                 <small classNameName="text-default-500">Login with your Data that you entered during your Registration</small>
        //             </CardHeader>
        //             <CardBody classNameName="overflow-visible py-2 w-[29rem] gap-5">
        //             <Input type="text" label="username" onChange={(e)=>setUsername(e.target.value)}/>
        //             <Input type="email" label="email" onChange={(e)=>setEmail(e.target.value)}/>
        //             <Input type="password" label="password" onChange={(e)=>setPassword(e.target.value)}/>
        //             <Input type="password" label="re-password"onChange={(e)=>setPassword2(e.target.value)} />
        //             <Button type='submit' radius="full" classNameName="bg-gradient-to-tr from-purple-500 to-blue-500 text-white shadow-lg">
        //             Button
        //             </Button>
        //             <p classNameName="text-small uppercase font-solid text-center">Already Have An Account? Login</p>
        //             </CardBody>
        //         </form>
        //         </Card>
                
        //     </div>
        //     <div classNameName='w-3/5 h-screen'>
        //         <img src="images/loginpage.png" alt="" classNameName='h-full w-full bg-[#4B0973]'/>
        //     </div>
        // </div>

            <div className='w-full p-5 overflow-auto flex flex-col justify-center items-center'>
                <div className="border bg-white max-w-sm text-black flex flex-col justify-center items-center p-6 rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">One TAP</h1>
                    <h2 className="text-center mb-4">Signup with Facebook to find your Facebook friends</h2>
                    <button className="bg-blue-600 text-white p-2 rounded-md w-full mb-4">Login with Facebook</button>
                    
                    <div className="flex items-center w-full my-4">
                        <hr className="flex-grow border-t border-black" />
                        <span className="px-4">or</span>
                        <hr className="flex-grow border-t border-black" />
                    </div>
                    
                    <form onSubmit={handleSignup} className="w-full">
                        <input type="text" placeholder="Phone number, username, or email" onChange={(e)=>setUsername(e.target.value)} className="border border-black p-2 rounded-md w-full mb-3"/>
                        <input type="text" placeholder="Full Name" className="border border-black p-2 rounded-md w-full mb-3"/>
                        <input type="text" placeholder="Username" className="border border-black p-2 rounded-md w-full mb-3"/>
                        <input type="password" placeholder="Password" className="border border-black p-2 rounded-md w-full mb-3"/>
                    </form>
                    
                    <div className="text-center my-4">
                        <span className="block mb-2">Enter your username and password to create a new account.</span>
                        <span>Get the app from the Microsoft Store or download the Instagram APK for Android from Google Play Store.</span>
                    </div>
                    
                    <button className="bg-blue-500 text-white p-2 rounded-md w-full">Sign Up</button>
                </div>
                
                <div className="border p-4 mt-6 bg-white rounded-lg w-full max-w-sm text-center">
                    <span>Do you have an account? <Link to='/login'><a className="text-blue-500">Login</a></Link></span>
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
                        <span className="inline-block mx-1">© 2024 OneTap from MA</span> &middot;
                        <span className="inline-block mx-1">Contact uploading and non-users</span> &middot;
                        <span className="inline-block mx-1">MA Verified</span>
                    </p>
                </div>
        </div>
    
      )
}

export default Signup
