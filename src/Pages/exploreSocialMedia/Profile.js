import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import FollowButton from "../../Components/follow_btn/FollowButton";
import { SiCodefactor } from "react-icons/si";
import { BsPostcardHeart } from "react-icons/bs";
import Post from "../../Components/post/Post";
import { useDisclosure } from "@nextui-org/react";
import { IoMdImages } from "react-icons/io";
import AvatarProfile from "../../Components/avatar/Avatar_profile";
import { Card, Skeleton } from "@nextui-org/react";
import PostModal from "../../Components/post/PostModal";

function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState();
  const current_user = useSelector((state) => state.auth.username);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/app_profile/userprofile/",
          {
            username: username,
            current_user: current_user,
          }
        );
        console.log(response.data);
        const data = response.data;
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);


  const handleOpen = (post) => {
    setSelectedPost(post);
    onOpen();
  };

  return (
    <>
      {user && (
        <div className="w-full flex flex-col overflow-auto gap-10">
          <div className="w-full flex flex-col justify-center items-center gap-3 p-3">
            {user.profile.image ? (
              <img
                src={`http://127.0.0.1:8000${user.profile.image}`}
                alt="img"
                className="rounded-full border-1 w-52 h-52 object-cover"
              />
            ) : (
              <AvatarProfile username={user.profile.user.username} size="6xl" />
            )}
            <h6>{user.profile.full_name}</h6>
            <small>@{user.profile.user.username}</small>
            <div className="w-96 flex items-center justify-center w-">
              {!user.profile.bio === "undefined" ? (<span className="text-center">{user.profile.bio}</span>) : (
                ''
              )}
            </div>
            <span>
              {user.follower && user.following
                ? `${user.follower.length} followers . ${user.following.length} following`
                : `0 followers · 0 following`}
            </span>
            {username == current_user ? (
              <div className="flex gap-4">
                <Link to="/profile-settings">
                  <button className="px-5 py-3 font-semibold rounded-3xl bg-[#E9E9E9]">
                    Edit Profile
                  </button>
                </Link>
                <button className="px-5 py-3 font-semibold rounded-3xl bg-[#E9E9E9]">
                  Settings
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  className="px-5 py-3 font-semibold rounded-3xl bg-[#E9E9E9]"
                  onClick={() =>
                    navigate("/chathome", {
                      state: { username: user.user.username },
                    })
                  }
                >
                  Messsage
                </button>
                <FollowButton
                  follow_user={user.profile.user.username}
                  follow_status={user.follow_status}
                />
              </div>
            )}
          </div>

          <div className="flex justify-center items-center gap-5 w-full sticky top-0 bg-white shadow-sm p-4">
            <BsPostcardHeart className="text-2xl cursor-pointer" />
            <SiCodefactor className="text-2xl cursor-pointer" />
          </div>
          <div className="h-screen bg-white w-full">


            {
              loading ? (
                <div className="h-screen overflow-auto relative bg-white w-full">
                  <div className="columns-2 xl:columns-4 p-4 gap-4 space-y-4">
                    {[...Array(8)].map((_, index) => (
                      <Card key={index} className="w-full h-auto rounded-3xl">
                        <Skeleton className="rounded-lg">
                          <div
                            className="rounded-lg bg-default-300"
                            style={{ height: `${Math.random() * 300 + 300}px` }}
                          ></div>
                        </Skeleton>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {user.posts.length > 0 ? (
                    <div className="columns-2 xl:columns-4 p-4 gap-4 space-y-4">
                      {user.posts.map((post, index) => (
                        <Post key={index} post={post} handleOpen={handleOpen} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center w-full h-full items-center">
                      <IoMdImages className="text-9xl" />
                      <h1 className="font-bold text-2xl">No Post Yet</h1>
                    </div>
                  )}
                </>
              )
            }
          </div>
          {selectedPost && (
            <PostModal isOpen={isOpen} onClose={onClose} selectedPost={selectedPost} />
          )}
        </div>
      )}
    </>
  );
}

export default Profile;
