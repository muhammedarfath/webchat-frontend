import React from "react";
import { Avatar } from "@nextui-org/react";

function AvatarProfile({ image, username }) {
  if (!username) {
    return null;
  }

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
  );
}

export default AvatarProfile;
