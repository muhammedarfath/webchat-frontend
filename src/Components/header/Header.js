import React from 'react'
import Logo from "../../Components/Logo/Logo";
import { FaCameraRetro } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";
import { RiSettings4Fill } from "react-icons/ri";
import { MdNotifications } from "react-icons/md";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, cn } from "@nextui-org/react";
import { logoutUser } from '../../Redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(
      logoutUser({ authTokens: null, user_id: null, is_superuser: false, image: null, username: null, email: null })
    );
    navigate("/login");
  };
  return (
    <div className="fixed top-8 z-50 flex text-black  border-1 w-3/4 bg-opacity-35 shadow-md rounded-3xl border-gray-100 backdrop-blur-md p-4 list-none ">
      <div className="flex w-1/4 items-center justify-center gap-3">
        <Logo height={50} width={50} />
        <span className="hidden lg:block font-bold">𝖋𝖞𝖇𝖔𝖝</span>
      </div>
      <div className="hidden lg:flex w-3/4 font-semibold justify-evenly items-center">
        <li className='cursor-pointer text-2xl'>
          <Button
            className='bg-white'
          >
            <MdNotifications className='text-2xl' />
          </Button>
        </li>
        <li className='cursor-pointer text-2xl'>
          <Button
            className='bg-white'
          >
            <RiSettings4Fill className='text-2xl' />
          </Button>
        </li>
        <li className='cursor-pointer text-2xl'>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className='bg-white'
              >
                <RiShieldUserFill className='text-2xl' />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
              <DropdownSection title="Actions" showDivider>
                <DropdownItem
                  key="new"
                  description="Create a new file"
                >
                  New file
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title="Danger zone">
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  description="Permanently delete the file"
                >
                  Delete file
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </li>
        <li className='cursor-pointer text-2xl'>
          <Button
            className='bg-white'
          >
            <FaCameraRetro className='text-2xl' />
          </Button>
        </li>
      </div>
    </div>
  )
}

export default Header

