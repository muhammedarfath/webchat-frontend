import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import FollowButton from "../../Components/follow_btn/FollowButton";
import requests from "../../utils/urls";
import { showErrorToast } from "../../utils/Toaser";
import AvatarProfile from'../../Components/avatar/Avatar_profile'
import SuggestedForm from "../../Components/contacts/SuggestedForm";

function People() {
  const [users, setUsers] = useState([]);
  const current_userId = useSelector((state) => state.auth.user_id);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, [current_userId]);

  const fetchAllUsers = async (query = "") => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${requests.suggestedFriends}`,
        {
          current_userId,
          search_query: query,
        }
      );
      setUsers(response.data);
    } catch (error) {
      showErrorToast("somthing went wrong",error)
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-4">
        <div className="w-full">
         <SuggestedForm fetchAllUsers={fetchAllUsers}/>
        </div>
        <div className="h-screen w-full overflow-auto">
          <div className="flex justify-center items-center">
            <div className="border-none w-[600px] h-screen">
              <div className="flex items-center p-6 justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="font-bold">Suggested</h1>
                </div>
              </div>
              {users.map((user) => (
                <div
                  className="cursor-pointer bg-opacity-100 flex items-center justify-between ml-9 mt-1 mr-10 rounded-lg relative"
                  key={user.id}
                >
                  <div className="flex justify-center items-center mt-1">
                    <div className="w-10 h-10 overflow-hidden">
                      {user.image ? (
                        <AvatarProfile image={user.image} size="lg"/>
                      ) : (
                        <AvatarProfile username={user.user.username} size="lg"/>
                      )}
                    </div>
                    <div className="flex flex-col items-start ml-3">
                      <Link to={`/profile/${user.user.username}`}>
                        <h1 className="text-1xl mt-2 font-medium">
                          {user.user.username}
                        </h1>
                      </Link>
                      <small>Suggested for you</small>
                    </div>
                  </div>
                  <FollowButton
                    follow_user={user.user.username}
                    follow_status={user.follow_status}
                    follow_user_image={user.image}
                    follow_user_username={user.user.username}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default People;
