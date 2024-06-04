import React from 'react'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

function Profile() {
  return (
    <div className='w-full h-[100vh] overflow-auto flex flex-col items-center'>
        <div className='flex lg:w-[80rem] lg:gap-11 gap-4 justify-center'>
            <div className='pt-16'>
                <img className='lg:w-40 w-20 lg:h-40 rounded-full' src="images/profil-image.webp" alt="Description" />
            </div>

            <div>
                <div className='flex pt-16 gap-3 justify-center items-center'>
                    <h1>ar__f4th</h1>
                    <div className='border-1 border-black p-1.5 rounded-md'>
                        <span>Edit Profile</span>  
                    </div>
                    <div className='border-1 border-black p-1.5 rounded-md'>
                        <span>Settings</span>  
                    </div>
                </div>
            
                <div className='flex gap-5 mt-5'>
                    <h1>posts</h1>
                    <h1>followers</h1>
                    <h1>following</h1>
                </div>

                <div className='flex flex-col mt-5'>
                    <span>FULL NAME</span>
                    <span>PLACE</span>
                    <span>DISCRIPTION</span>
                </div>


            </div>

        </div>
        <div className='lg:w-[60rem] mt-12 px-4'>
            <div className='grid grid-cols-3 gap-4 '>

                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                                <small className="text-default-500">12 Tracks</small>
                                <h4 className="font-bold text-large">Frontend Radio</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://nextui.org/images/hero-card-complete.jpeg"
                                width={270}
                                />
                            </CardBody>
                        </Card>
             
         
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                                <small className="text-default-500">12 Tracks</small>
                                <h4 className="font-bold text-large">Frontend Radio</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://nextui.org/images/hero-card-complete.jpeg"
                                width={270}
                                />
                            </CardBody>
                        </Card>
             
                 
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                                <small className="text-default-500">12 Tracks</small>
                                <h4 className="font-bold text-large">Frontend Radio</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://nextui.org/images/hero-card-complete.jpeg"
                                width={270}
                                />
                            </CardBody>
                        </Card>
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                                <small className="text-default-500">12 Tracks</small>
                                <h4 className="font-bold text-large">Frontend Radio</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://nextui.org/images/hero-card-complete.jpeg"
                                width={270}
                                />
                            </CardBody>
                        </Card>
             
         
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                                <small className="text-default-500">12 Tracks</small>
                                <h4 className="font-bold text-large">Frontend Radio</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://nextui.org/images/hero-card-complete.jpeg"
                                width={270}
                                />
                            </CardBody>
                        </Card>
             
                 
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                                <small className="text-default-500">12 Tracks</small>
                                <h4 className="font-bold text-large">Frontend Radio</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://nextui.org/images/hero-card-complete.jpeg"
                                width={270}
                                />
                            </CardBody>
                        </Card>
                              
            </div>
        </div>
    </div>    
  )
}

export default Profile
