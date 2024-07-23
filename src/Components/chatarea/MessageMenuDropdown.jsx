import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { MdOutlineContentCopy } from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
function MessageMenuDropdown() {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownMenu>
        <DropdownItem
          key="new"
          startContent={<PiShareFat className={iconClasses} />}
        >
          Forward
        </DropdownItem>
        <DropdownItem
          key="copy"
          startContent={<MdOutlineContentCopy className={iconClasses} />}
        >
          Copy
        </DropdownItem>
        <DropdownItem
          key="edit"
          startContent={<MdOutlineDeleteSweep className={iconClasses} />}
        >
          Unsend
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default MessageMenuDropdown;
