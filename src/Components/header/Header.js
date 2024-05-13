import React,{useState} from 'react'
import { RiMessage2Fill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { BiSolidVideos } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Header({handleProfileModelOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {image} = useSelector(state=>state.auth)
    const [profiletoggle,setProfiletoggle] = useState(false)

    console.log(image);

    const handleprofiletoggle = () =>{
        setProfiletoggle(!profiletoggle)
    }
    const handleModal = () => {
        handleProfileModelOpen()
    }
    const handleLogout = () => {
        dispatch(logoutUser({ authTokens: null, user_id: null,is_superuser:false}));
        navigate('/login');
    };
    
    
  return (
    <div className="hidden border lg:flex h-screen">
        <div className="text-[#420BA1] p-4 shadow-xl bg-white">
            <div className="py-4">
                <a href="#" className="text-[#420BA1] text-lg font-semibold uppercase">Logo</a>
            </div>
                
            <nav className="flex-1 flex flex-col items-center py-[5rem]">
                <div className="border-solid cursor-pointer border-1 rounded-lg border-white bg-[#F4F4F4] p-3">
                    <RiMessage2Fill className="text-[#420BA1] text-2xl transition-transform transform hover:scale-x-[-1] " />
                </div>
                <div className="mt-4 border-solid border-1 cursor-pointer  rounded-lg border-white bg-[#F4F4F4] p-3">
                    <FaUserEdit onClick={handleModal} className="text-[#420BA1] text-2xl transition-transform transform hover:rotate-45" />
                </div>

                <div className="mt-4 border-solid border-1 cursor-pointer  rounded-lg bg-[#F4F4F4] border-white p-3">
                    <BiSolidVideos className="text-[#420BA1] text-2xl hover:vibrate" />
                </div>

                <div className="mt-4 border-solid border-1 cursor-pointer  rounded-lg bg-[#F4F4F4] border-white p-3">
                    <IoSettings className="text-[#420BA1] text-2xl transition-transform transform hover:rotate-45" />
                </div>
            </nav>
           
            <div class="absolute bottom-4 w-[3rem] h-[3rem] overflow-hidden" onClick={handleprofiletoggle}>
                <img src={`http://127.0.0.1:8000${image}`} class=" w-full h-full rounded-full" alt="image" />
            </div>
            {profiletoggle && <div className="absolute bottom-[4rem] w-36 bg-white shadow-md rounded-md z-10">
                <ul>
                <li className="py-1 px-3 hover:bg-gray-200">Profile</li>
                <li className="py-1 px-3 hover:bg-gray-200 cursor-pointer" onClick={handleLogout} >Logout</li>
                </ul>
            </div>}

        </div>
    </div>

  )
}

export default Header
