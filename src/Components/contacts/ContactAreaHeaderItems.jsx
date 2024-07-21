import React, { useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
  } from "@nextui-org/react";
  import { IoIosSearch } from "react-icons/io";
  import { Input } from "@nextui-org/react";
  import { CiSearch } from "react-icons/ci";
  import { motion, AnimatePresence } from "framer-motion";
  import { BsThreeDotsVertical } from "react-icons/bs";

function ContactAreaHeaderItems() {
  const [search, openSearch] = useState(false);
  return (
    <>
      <AnimatePresence>
        {search ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              label="Search"
              isClearable
              radius="lg"
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "bg-default-200/50",
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder="Type to search..."
              startContent={
                <CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
              onClear={() => openSearch(false)}
            />
          </motion.div>
        ) : (
          <IoIosSearch
            className="text-2xl font-bold cursor-pointer"
            onClick={() => openSearch(true)}
          />
        )}
      </AnimatePresence>
      <Dropdown>
        <DropdownTrigger>
          <div className="cursor-pointer">
            <BsThreeDotsVertical size={20} />
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions">
          <DropdownItem key="block" color="danger" className="text-black">
            Block Users
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default ContactAreaHeaderItems;
