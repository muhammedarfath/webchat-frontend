import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";
import { RiSettings4Fill } from "react-icons/ri";
import { MdNotifications } from "react-icons/md";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";

function HeaderItems({ handleLogout, handlenavigate }) {
  return (
    <div className="flex w-3/4 font-semibold justify-end lg:justify-evenly items-center">
      <li className="hidden lg:block cursor-pointer text-2xl">
        <Button className="bg-white">
          <MdNotifications className="text-2xl" />
        </Button>
      </li>
      <li className="hidden lg:block  cursor-pointer text-2xl">
        <Button className="bg-white">
          <RiSettings4Fill className="text-2xl" />
        </Button>
      </li>
      <li className="hidden lg:block cursor-pointer text-2xl">
        <Dropdown>
          <DropdownTrigger>
            <Button className="bg-white">
              <RiShieldUserFill className="text-2xl" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Select" showDivider>
              <DropdownItem
                onClick={handlenavigate}
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
                onClick={handleLogout}
              >
                Logout
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </li>
      <li className="cursor-pointer text-2xl">
        <Button className="bg-white">
          <FaCameraRetro className="lg:text-2xl text-8xl" />
        </Button>
      </li>
    </div>
  );
}

export default HeaderItems;
