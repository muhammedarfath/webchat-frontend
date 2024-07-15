import React, { useRef, useState } from 'react';
import { Input, Textarea, Button } from "@nextui-org/react";
import AvatarProfile from '../avatar/Avatar_profile';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateUserProfile } from '../../Redux/auth/authSlice';

function ProfileSettings() {
  const fileinputRef = useRef(null);
  const dispatch = useDispatch();
  const { username, image, full_name, bio, email, user_id } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(image);
  const [name, setName] = useState(full_name);
  const [newUsername, setNewUsername] = useState(username);
  const [newBio, setNewBio] = useState(bio);
  const [website, setWebsite] = useState("");
  const [gender, setGender] = useState("");

  const handleButtonClick = () => {
    fileinputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };



  const handleSave = async () => {
    const formData = new FormData();
    formData.append("full_name", name);
    formData.append("username", newUsername);
    formData.append("bio", newBio);
    formData.append("website", website);
    formData.append("gender", gender);
    if (profileImage && profileImage instanceof File) {
      formData.append("image", profileImage);
    }
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/users_auth/edit/${user_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const updatedProfile = response.data;
        dispatch(updateUserProfile(updatedProfile));
        alert('Profile updated successfully!');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='w-full'>
      <div className='m-8 w-96'>
        <h1 className='font-bold text-3xl'>Edit profile</h1>
        <span>Keep your personal details private. Information you add here is visible to anyone who can view your profile.</span>
      </div>
      <br />
      <form className='flex flex-col gap-6'>
        <div className='ml-8 flex gap-6 items-center'>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileinputRef}
            style={{ display: 'none' }}
          />
          <div>
            <small>Photo</small>
            {profileImage ? (
              <AvatarProfile username={username} image={profileImage} size="3xl" />
            ) : (
              <AvatarProfile username={username} image={image} size="3xl" />
            )}
          </div>
          <Button onClick={handleButtonClick} className='bg-[#1D9BF0] text-white'>
            Change
          </Button>
        </div>
        <div className='ml-8 w-96 gap-3 flex'>
          <Input
            type="text"
            label="Full Name"
            value={name}
            placeholder="Enter Your Full Name"
            labelPlacement="outside"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            label="Username"
            value={newUsername}
            placeholder="Enter your Username"
            labelPlacement="outside"
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <Textarea
          label="Bio"
          value={newBio}
          labelPlacement="outside"
          placeholder="Enter your Bio"
          className="ml-8 max-w-sm"
          onChange={(e) => setNewBio(e.target.value)}
        />
        <div className='ml-8 w-96 flex flex-col gap-5'>
          <Input
            type="link"
            label="Website"
            value={website}
            placeholder="Enter Your Website"
            labelPlacement="outside"
            onChange={(e) => setWebsite(e.target.value)}
          />
          <Input
            type="text"
            label="Gender"
            value={gender}
            placeholder="Select your Gender"
            labelPlacement="outside"
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className='fixed p-5 bottom-0 w-full flex justify-center items-center gap-3 shadow-2xl'>
          <Button className='shadow-sm px-5 py-3 rounded-3xl bg-[#e3e3e3] text-black' onClick={() => window.location.reload()}>Reset</Button>
          <Button className='shadow-sm px-5 py-3 rounded-3xl bg-[#e3e3e3] text-black' onClick={handleSave}>Save</Button>
        </div>
      </form>
    </div>
  )
}

export default ProfileSettings;
