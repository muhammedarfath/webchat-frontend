import React, { useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
function SuggestedForm({fetchAllUsers}) {

  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchTimeout = useRef(null);

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

  return (
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
  );
}

export default SuggestedForm;
