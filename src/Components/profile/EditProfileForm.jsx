import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Textarea, Button } from "@nextui-org/react";
import AvatarProfile from "../avatar/Avatar_profile";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUserProfile } from "../../Redux/auth/authSlice";
import requests from "../../utils/urls";
import { showErrorToast, showSuccessToast } from "../../utils/Toaser";

function EditProfileForm() {
  const fileinputRef = useRef(null);
  const dispatch = useDispatch();
  const { username, image, full_name, bio, email, user_id } = useSelector(
    (state) => state.auth
  );
  const [profileImage, setProfileImage] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      full_name: "",
      username: "",
      bio: "",
      website: "",
      email: "",
    },
  });
  useEffect(() => {
    reset({
      full_name: full_name,
      username: username,
      bio: bio,
      email: email,
    });
  }, [full_name, username, bio, email, reset]);

  const handleButtonClick = () => {
    fileinputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("profile.full_name", data.full_name);
      formData.append("profile.bio", data.bio);
      if (fileinputRef.current.files[0]) {
        formData.append("profile.image", fileinputRef.current.files[0]);
      }

      const response = await axios.post(
        `${requests.editUserProfile}${user_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const updatedProfile = response.data;
        dispatch(
          updateUserProfile({
            username: updatedProfile.username,
            email: updatedProfile.email,
            full_name: updatedProfile.profile.full_name,
            bio: updatedProfile.profile.bio,
            image: updatedProfile.profile.image,
          })
        );
        showSuccessToast("Profile Updated");
      } else {
        showErrorToast("Something went wrong. Please try again.");
      }
    } catch (error) {
      showErrorToast("An error occurred. Please try again.", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="ml-8 flex gap-6 items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileinputRef}
          style={{ display: "none" }}
        />
        <div>
          <small>Photo</small>
          {profileImage ? (
            <img src={profileImage} className="w-24 h-24 rounded-full" alt="" />
          ) : (
            <AvatarProfile image={image} username={username} size="3xl" />
          )}
        </div>
        <Button onClick={handleButtonClick} className="bg-[#1D9BF0] text-white">
          Change
        </Button>
      </div>
      <div className="ml-8 w-96 gap-3 flex">
        <Input
          type="text"
          label="Full Name"
          placeholder="Enter Your Full Name"
          labelPlacement="outside"
          {...register("full_name")}
        />
        <Input
          type="text"
          label="Username"
          placeholder="Enter your Username"
          labelPlacement="outside"
          {...register("username")}
        />
      </div>
      <Textarea
        label="Bio"
        labelPlacement="outside"
        placeholder="Enter your Bio"
        className="ml-8 max-w-sm"
        {...register("bio")}
      />
      <div className="ml-8 w-96 flex flex-col gap-5">
        <Input
          type="text"
          label="Website"
          placeholder="Enter Your Website"
          labelPlacement="outside"
          {...register("website")}
        />
        <Input
          type="text"
          label="Email"
          placeholder="Edit Your Email"
          labelPlacement="outside"
          {...register("email")}
        />
      </div>

      <div className="fixed p-5 bottom-0 w-full flex justify-center items-center gap-3 shadow-2xl">
        <Button
          className="shadow-sm px-5 py-3 rounded-3xl bg-[#e3e3e3] text-black"
          onClick={() => reset()}
        >
          Reset
        </Button>
        <Button
          className="shadow-sm px-5 py-3 rounded-3xl bg-[#e3e3e3] text-black"
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default EditProfileForm;
