import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Redux/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAddBox } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";

function Header({handleProfileModelOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {image} = useSelector(state=>state.auth)
    const [profiletoggle,setProfiletoggle] = useState(false)

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
    <div className="hidden border-2 lg:flex h-screen">
        <div className="text-[#000000] p-4 bg-white">
            <div className="py-4 flex items-center justify-center">
                <a href="#" className="text-[#000000] text-3xl font-semibold uppercase">OT</a>
            </div>
                
            <nav className="flex-1 flex flex-col items-center py-[5rem] gap-5">
                   
                        <Link to='/' className='flex gap-3 w-full hover:bg-gray-100 py-4 rounded-lg items-center cursor-pointer'>
                            <GoHome className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                            <span>Home</span>
                        </Link>
                    
                    <div className='flex gap-4 w-full hover:bg-gray-100 py-4 rounded-lg items-center cursor-pointer'>
                        <IoSearchOutline className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                        <span>Search</span>
                    </div> 
                    <Link to='/reels' className='flex gap-3 w-full hover:bg-gray-100 py-4 rounded-lg items-center cursor-pointer'>
                        <BiMoviePlay className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                        <span>Reels</span>
                    </Link> 
                    <Link to='/chathome' className='flex gap-3 w-full hover:bg-gray-100 py-4 rounded-lg items-center cursor-pointer'>
                        <FiMessageCircle className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                        <span>Message</span>
                    </Link> 
                    <div className='flex gap-3 w-full hover:bg-gray-100 py-4 rounded-lg items-center cursor-pointer'>
                        <IoMdNotificationsOutline className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                        <span>Notification</span>
                    </div>  
                    <div className='flex gap-3 w-full hover:bg-gray-100 py-4 rounded-lg items-center cursor-pointer'>
                        <MdOutlineAddBox className="text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] " />
                        <span>Create</span>
                    </div>  
                    {/* <div className='flex gap-3 w-full hover:bg-gray-100 py-4 rounded-lg items-center' onClick={handleprofiletoggle}>
                        <img src={`http://127.0.0.1:8000${image}`} class=" w-full h-full rounded-full" alt="image" />
                        <span>Profile</span>
                    </div>    
                    {profiletoggle && <div className="absolute bottom-[4rem]  w-36 bg-white shadow-md rounded-md z-10">
                        <ul>
                        <li className="py-1 px-3 hover:bg-gray-200">Profile</li>
                        <li className="py-1 px-3 hover:bg-gray-200 cursor-pointer" onClick={handleLogout} >Logout</li>
                        </ul>
                    </div>} */}
            </nav>
           
            <div class="absolute bottom-4 flex gap-3 w-full hover:bg-gray-100 py-4 rounded-lg items-center" >
                <AiOutlineMenu className='text-[#000000] text-2xl transition-transform transform hover:scale-x-[-1] '/>
                <span>More</span>
            </div>


        </div>
    </div>

  )
}

export default Header
