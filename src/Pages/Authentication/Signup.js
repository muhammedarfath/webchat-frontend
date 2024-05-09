import React from 'react'
import {Card, CardHeader, CardBody, Input,Button} from "@nextui-org/react";

function Signup() {
    return (
        <div className='flex'>
            <div className="w-2/5 h-screen flex items-center justify-center" >
    
                <Card className="py-4 ">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-4">
                    <p className="uppercase font-bold  text-2xl">Login</p>
                    <small className="text-default-500">Login with your Data that you entered during your Registration</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 w-[29rem] gap-5">
                <Input type="text" label="username" />
                <Input type="email" label="email" />
                <Input type="password" label="password" />
                <Input type="password" label="re-password" />
                <Button radius="full" className="bg-gradient-to-tr from-purple-500 to-blue-500 text-white shadow-lg">
                Button
                </Button>
                <p className="text-small uppercase font-solid text-center">Already Have An Account? Login</p>
                </CardBody>
                </Card>
                
            </div>
            <div className='w-3/5 h-screen'>
                <img src="images/loginpage.png" alt="" className='h-full w-full bg-[#4B0973]'/>
            </div>
        </div>
    
      )
}

export default Signup
