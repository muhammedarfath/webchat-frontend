import React from "react";
import Logo from "../../Components/Logo/Logo";
import HeaderItems from "./HeaderItems";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { logoutUser } from "../../Redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Header() {
  const { username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(
      logoutUser({
        authTokens: null,
        user_id: null,
        is_superuser: false,
        image: null,
        username: null,
        email: null,
      })
    );
    navigate("/login");
  };
  
  const handlenavigate = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="fixed top-8 z-50 flex text-black border-1 w-3/4 bg-opacity-35 shadow-md rounded-3xl border-gray-100 backdrop-blur-md p-4 list-none">
      <div className="flex lg:w-1/4 items-center justify-center gap-3">
        <div className="lg:block hidden">
          <Logo height={50} width={50} />
        </div>
        <Dropdown>
          <DropdownTrigger>
            <li className="lg:hidden cursor-pointer text-2xl">
              <Logo height={50} width={50} />
            </li>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Select" showDivider>
              <DropdownItem
                onClick={() => {
                  handlenavigate()
                }}
                key="new"
                description="Create a Profile"
              >
                Profile
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Login again">
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onClick={() => {
                  handleLogout()
                }}
              >
                Logout
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        <span className="font-bold">fybox</span>
      </div>
      <HeaderItems handleLogout={handleLogout} handlenavigate={handlenavigate}/>
    </div>
  );
}

export default Header;
