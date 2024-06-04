import React from 'react'
import {User} from "@nextui-org/user";
import { useSelector } from 'react-redux';

function ProfileIcon() {
    const {image,username,email} = useSelector(state=>state.auth)
    console.log(image);

  return (
    <User   
    name={username}
    description={email}
    avatarProps={{
        src:`http://127.0.0.1:8000${image}`
    }}
  />
  )
}

export default ProfileIcon
