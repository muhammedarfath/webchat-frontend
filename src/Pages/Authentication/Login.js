import React,{useState} from 'react'
import {Card, CardHeader, CardBody, Input,Button} from "@nextui-org/react";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/auth/authSlice';

function Login() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const handlesubmit = async (e)=>{
    e.preventDefault()
    try{
     const response = await axios.post('http://127.0.0.1:8000/chat/login/',{
      username,
      password
     })
     if (response.status === 200){
      const data = response.data
      console.log(data,"this is data")
      dispatch(loginUser({authTokens: data.access, user_id: data.user_id, username: data.username, email: data.user_email,is_superuser:data.is_superuser }))
      navigate('/')
     }else{
      alert('somthing went wrong')
     }

    }catch(error){
      console.log(error,"this my error");
      alert(error)
    }
  }

  
  return (
    <div className='flex'>
        <div className="w-2/5 h-screen flex items-center justify-center" >

            <Card className="py-4 ">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-4">
                <p className="uppercase font-bold  text-2xl">Login</p>
                <small className="text-default-500">Login with your Data that you entered during your Registration</small>
            </CardHeader>
            
              <form onSubmit={handlesubmit}>
                <CardBody className="overflow-visible py-2 w-[29rem] gap-5">
                  <Input type="text" label="username" onChange={(e)=>setUsername(e.target.value)}/>
                  <Input type="password" label="password" onChange={(e)=>setPassword(e.target.value)} />
                  <Button type='submit' radius="full" className="bg-gradient-to-tr from-purple-500 to-blue-500 text-white shadow-lg">
                  Button
                  </Button>
                </CardBody>
            </form>
            <p className="text-small uppercase font-solid text-center">Don’t have an account? Signup</p>
            
            </Card>
            
        </div>
        <div className='w-3/5 h-screen'>
            <img src="images/loginpage.png" alt="" className='h-full w-full bg-[#4B0973]'/>
        </div>
    </div>

  )
}

export default Login
