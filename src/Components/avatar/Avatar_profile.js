import React from "react";
import { Avatar } from "@nextui-org/react";

function AvatarProfile({ image, username, size = "sm" }) {
  if (!username) {
    return null;
  }

  const firstLetter = username.charAt(0).toUpperCase();

  const sizeClasses = {
    sm: "w-6 h-6 text-md",
    md: "w-8 h-8 text-lg",
    lg: "w-10 h-10 text-xl",
    xl: "w-12 h-12 text-2xl",
    "2xl": "w-16 h-16 text-3xl",
    "3xl": "w-20 h-20 text-4xl",
  };

  const selectedSizeClass = sizeClasses[size] || sizeClasses.sm;

  return (
    <>
      {image ? (
        <Avatar
          src={`http://127.0.0.1:8000${image}`}
          className={selectedSizeClass}
        />
      ) : (
        <Avatar
          name={firstLetter}
          className={selectedSizeClass}
        />
      )}
    </>
  );
}

export default AvatarProfile;
