import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import FollowButton from "../../Components/follow_btn/FollowButton";
import { SiCodefactor } from "react-icons/si";
import { BsPostcardHeart } from "react-icons/bs";

function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState();
  const current_user = useSelector((state) => state.auth.username);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/app_profile/userprofile/",
          {
            username,
          }
        );
        const data = response.data;
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);



  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      {user && <div className="w-full flex flex-col overflow-auto gap-10">
        <div className="w-full h-1/2 flex flex-col justify-center items-center gap-1 p-3">
          {user.image ? (<img src={`http://127.0.0.1:8000${user.image}`} alt="img" className="rounded-full border-1 w-52 h-52 object-cover" />) :
            (<img src="/images/profile-image.webp" alt="img" className="rounded-full border-1 w-52 h-52 object-cover" />)
          }
          <h6>{user.user.username}</h6>
          <small>@{user.full_name}</small>
          <span>{user.follower && user.following && `${user.follower.length} followers . ${user.following.length} following`}</span>
          <div className="flex gap-4">

            <button className="px-5 py-3 font-semibold rounded-3xl bg-[#E9E9E9]" onClick={()=>navigate('/chathome',{state:{username:user.user.username}})}>Messsage</button>
            {/* <FollowButton user={user} currentUser={current_user} /> */}
          </div>
        </div>

        <div className="flex justify-center items-center gap-5 w-full sticky top-0 bg-white shadow-sm p-4">
          <BsPostcardHeart className="text-2xl cursor-pointer" />
          <SiCodefactor className="text-2xl cursor-pointer" />

        </div>

        <div class="columns-2 xl:columns-4 p-4 text-white gap-4 space-y-4">
          <img src="https://i.pinimg.com/564x/c0/e6/34/c0e634692ee286ace714b718373c4d9f.jpg" alt="Image 1" class="w-full h-auto rounded-3xl" />
          <img src="https://i.pinimg.com/564x/81/3f/7a/813f7a5213a84224af60ae5a0ffafded.jpg" alt="Image 2" class="w-full h-auto rounded-3xl" />
          <img src="https://i.pinimg.com/564x/fc/fd/fb/fcfdfbe3e1d541a150b275a8a10b0e95.jpg" alt="Image 4" class="w-full h-auto rounded-3xl" />
          <img src="https://i.pinimg.com/564x/08/42/50/0842507422178226ea833e3509dce531.jpg" alt="Image 4" class="w-full h-auto rounded-3xl" />
          <img src="	https://i.pinimg.com/564x/5c/c9/4b/5cc94b98ac39384081d76f52cf5ee40e.jpg" alt="Image 3" class="w-full h-auto rounded-3xl" />
          <img src="https://i.pinimg.com/564x/c0/e6/34/c0e634692ee286ace714b718373c4d9f.jpg" alt="Image 1" class="w-full h-auto rounded-3xl" />
          <img src="https://i.pinimg.com/564x/81/3f/7a/813f7a5213a84224af60ae5a0ffafded.jpg" alt="Image 2" class="w-full h-auto rounded-3xl" />
          <img src="https://i.pinimg.com/564x/c0/e6/34/c0e634692ee286ace714b718373c4d9f.jpg" alt="Image 1" class="w-full h-auto rounded-3xl" />
        </div>

      </div>}

    </>
  );
}

export default Profile;
