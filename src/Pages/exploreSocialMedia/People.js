import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import FollowButton from "../../Components/follow_btn/FollowButton";

function People() {
  const [users, setUsers] = useState([]);
  const current_userId = useSelector((state) => state.auth.user_id);
  const current_user = useSelector((state) => state.auth.username);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchTimeout = useRef(null);

  useEffect(() => {
    fetchAllUsers();
  }, [current_userId]);

  
  const fetchAllUsers = async (query = "") => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat/suggested_friends/",
        {
          current_userId,
          search_query: query,
        }
      );
      setUsers(response.data);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };



  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchValue(query);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      fetchAllUsers(query);
    }, 100);
  };

  const clearSearch = () => {
    setSearchValue("");
    fetchAllUsers();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAllUsers(searchValue);
  };

  // const handleFollowToggle = (userId) => {
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.id === userId ? { ...user, isFollowed: !user.isFollowed } : user
  //     )
  //   );
  // };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-4">
        <div className="w-full">
          <form className="max-w-2xl mx-auto" onSubmit={handleSearchSubmit}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-gray-400"
                placeholder="Search Mockups, Logos..."
                value={searchValue}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {(isFocused || searchValue) && (
                <button
                  type="button"
                  className="absolute end-2.5 bottom-2.5 bg-gray-300 focus:outline-none rounded-full text-sm p-2"
                  onClick={clearSearch}
                >
                  <IoIosClose className="text-black font-semibold text-lg" />
                </button>
              )}
            </div>
          </form>
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
                  className="cursor-pointer bg-opacity-100 flex items-center justify-between ml-9 mt-1 mr-9 rounded-lg relative"
                  key={user.id}
                >
                  <div className="w-10 h-10 overflow-hidden">
                    {user.image ? (
                      <img
                        src={`http://127.0.0.1:8000${user.image}`}
                        className="w-full h-full rounded-full"
                        alt="image"
                      />
                    ) : (
                      <img
                        src="images/profil-image.webp"
                        className="w-full h-full rounded-full"
                        alt="image"
                      />
                    )}
                  </div>
                  <div className="flex flex-col items-start ml-3">
                    <Link to={`/profile/${user.user.username}`}>
                      <h1 className="text-1xl mt-3 font-medium">
                        {user.user.username}
                      </h1>
                    </Link>
                    <small>arfathusr</small>
                    <small>Suggested for you</small>
                  </div>
                  <FollowButton user={user} currentUser={current_user} />
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
