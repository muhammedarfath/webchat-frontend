import React from 'react'
import { useSelector } from 'react-redux';
import { Avatar } from "@nextui-org/react";

function Avatar_profile() {
    const { username,image } = useSelector((state) => state.auth);
    const firstLetter = username.charAt(0).toUpperCase();

  return (
    <>
        {image ? (
              <Avatar src={`http://127.0.0.1:8000${image}`} size="sm" />
            ) : (
              <Avatar
                name={firstLetter}
                className="lg:w-7 w-6 lg:h-7 h-6 lg:text-lg text-md"
              />
        )}
    </>
  )
}

export default Avatar_profile
