import React from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    User,
  } from "@nextui-org/react";
  import { Link } from "react-router-dom";

function ChatProfileDropdown({userArr}) {
  return (
    <div>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          {userArr.image ? (
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: `http://127.0.0.1:8000${userArr.image}`,
              }}
              className="transition-transform font-semibold gap-4"
              description="Last Seen at 07:15 PM"
              name={userArr.username.toUpperCase()}
            />
          ) : (
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: "images/profile-image.webp",
              }}
              className="transition-transform font-semibold gap-4"
              description="Last Seen at 07:15 PM"
              name={userArr.username.toUpperCase()}
            />
          )}
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@tonyreichert</p>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link to={`/profile/${userArr.username}`}>My Profile</Link>
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default ChatProfileDropdown;
