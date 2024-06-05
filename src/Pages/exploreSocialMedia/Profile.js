import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState();
  const current_user = useSelector((state) => state.auth.username);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/app_profile/userprofile/",
          {
            username,
          }
        );
        const data = response.data;
        console.log(data, "this data");
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [username]);

  const isFollowing = (followers, currentUser) => {
    return followers.some((follower) => follower.username === currentUser);
  };

  return (
    <>
      {user && (
        <div className="w-full h-[100vh] overflow-auto flex flex-col items-center">
          <div className="flex lg:w-[80rem] lg:gap-11 gap-4 justify-center">
            <div className="pt-16">
              {user.image ? (
                <img
                  className="lg:w-40 w-20 lg:h-40 rounded-full"
                  src={`http://127.0.0.1:8000${user.image}`}
                  alt="Description"
                />
              ) : (
                <img
                  className="lg:w-40 w-20 lg:h-40 rounded-full"
                  src="images/profil-image.webp"
                  alt="Description"
                />
              )}
            </div>

            <div>
              {user.user.username === current_user ? (
                <div className="flex pt-16 gap-5 justify-center items-center">
                  <h1 className="font-light text-2xl">{user.user.username}</h1>
                  <div className="shadow-sm p-1.5 px-4 rounded-md bg-gray-100">
                    <span className="font-semibold text-sm">Edit Profile</span>
                  </div>
                  <div className="shadow-sm p-1.5 px-4 rounded-md bg-gray-100">
                    <span className="font-semibold text-sm">Settings</span>
                  </div>
                </div>
              ) : (
                <div className="flex pt-16 gap-5 justify-center items-center">
                  <h1 className="font-light text-2xl">{user.user.username}</h1>
                  {isFollowing(user.followers, current_user) ? (
                    <div className="shadow-sm p-1.5 px-4 rounded-md bg-gray-100">
                      <span className="font-semibold text-sm">Following</span>
                    </div>
                  ) : (
                    <div className="shadow-sm p-1.5 px-4 text-white rounded-md bg-[#0095F6]">
                      <span className="font-semibold text-sm">Follow</span>
                    </div>
                  )}
                  <div className="shadow-sm p-1.5 px-4 rounded-md bg-gray-100">
                    <span className="font-semibold text-sm">Message</span>
                  </div>
                </div>
              )}

              <div className="flex gap-5 mt-5">
                <h1 className="flex gap-1">
                  {" "}
                  <span className="font-medium text-base">0</span>posts
                </h1>
                <h1 className="flex gap-1">
                  <span className="font-medium text-base">
                    {user.followers.length}
                  </span>
                  followers
                </h1>
                <h1 className="flex gap-1">
                  <span className="font-medium text-base">
                    {user.following.length}
                  </span>
                  following
                </h1>
              </div>

              <div className="flex flex-col mt-5">
                <span className="font-medium text-base">{user.full_name}</span>
                <span>kerala🤣</span>
                <span>{user.bio}</span>
              </div>
            </div>
          </div>
          <div className="lg:w-[60rem] mt-12 px-4">
            <div className="grid grid-cols-3 gap-4 ">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="py-4">
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
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
