import React, { useState } from 'react'
import {Card, CardHeader, CardBody, Input,Button} from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
        <div className='flex'>
            <div className="w-2/5 h-screen flex items-center justify-center" >
    
                <Card className="py-4 ">
                <form onSubmit={handleSignup}>    
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-4">
                        <p className="uppercase font-bold  text-2xl">Login</p>
                        <small className="text-default-500">Login with your Data that you entered during your Registration</small>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 w-[29rem] gap-5">
                    <Input type="text" label="username" onChange={(e)=>setUsername(e.target.value)}/>
                    <Input type="email" label="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <Input type="password" label="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <Input type="password" label="re-password"onChange={(e)=>setPassword2(e.target.value)} />
                    <Button type='submit' radius="full" className="bg-gradient-to-tr from-purple-500 to-blue-500 text-white shadow-lg">
                    Button
                    </Button>
                    <p className="text-small uppercase font-solid text-center">Already Have An Account? Login</p>
                    </CardBody>
                </form>
                </Card>
                
            </div>
            <div className='w-3/5 h-screen'>
                <img src="images/loginpage.png" alt="" className='h-full w-full bg-[#4B0973]'/>
            </div>
        </div>
    
      )
}

export default Signup
