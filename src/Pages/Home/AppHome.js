import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AuroraBackground } from "../../Components/ui/background-gradient-animation";
import { BentoGridThirdDemo } from "../../Components/grid/Grid";
import Footer from "../../Components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NotificationIcon from "../../Components/Logo/NotificationIcon";
import FollowButton from "../../Components/follow_btn/FollowButton";

function AppHome() {
  const { authTokens } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const current_userId = useSelector((state) => state.auth.user_id);
  const [users, setUsers] = useState([]);
  const current_user = useSelector((state) => state.auth.username);


  useEffect(() => {
    if (!authTokens) {
      navigate("/login");
    }
  }, [authTokens, navigate]);




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




  return (
    <AuroraBackground>
      <div
        className="justify-between flex w-full border border-slate-500 p-2 bg-black rounded-full cursor-pointer"
        
      >
        <div className="fixed top-6 right-6">
          <NotificationIcon/>
        </div>
        <div className="hidden w-[500px] lg:block md:block absolute lg:m-10 md:top-10 md:m-4 lg:border">
          <div className="py-4">
            <div className="flex justify-between pb-0 pt-2 px-4 items-center">
              <p className="text-tiny uppercase font-bold">Suggested for you</p>
              <small className="text-default-500">See All</small>
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



      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 lg:mt-[45rem] mt-[95rem] md:mt-[50rem] "
      >
        
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          ONE TAP.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        All your media needs just one tap.
        </div>
        <div className="h-full">
          <BentoGridThirdDemo />
        </div>
      </motion.div>
      <div className="w-full mt-4">
        <Footer />
      </div>
    </AuroraBackground>
  );
}

export default AppHome;
