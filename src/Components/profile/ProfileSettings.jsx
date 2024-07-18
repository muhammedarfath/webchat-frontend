import React from "react";
import EditProfileForm from "./EditProfileForm";

function ProfileSettings() {

  return (
    <div className="w-full">
      <div className="m-8 w-96">
        <h1 className="font-bold text-3xl">Edit profile</h1>
        <span>
          Keep your personal details private. Information you add here is
          visible to anyone who can view your profile.
        </span>
      </div>
      <br />
       <EditProfileForm/>
    </div>
  );
}

export default ProfileSettings;
