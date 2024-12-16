import React, { useState } from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

export default function Navbar({ isDarkMode, setIsDarkMode }) {

  return (
    <header className=" z-50 bg-white dark:bg-gray-700 top-0 fixed shadow-lg w-full py-4">
      <div className="container flex justify-between">
        <h1 className="text-xl dark:text-white md:text-3xl font-semibold">
          Where in the world! 
        </h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-indigo-500 text-white px-3 border-none transition-all duration-300 rounded-md hover:bg-indigo-400 active:scale-105"
        >
          {isDarkMode ? (
            <div>
              <span className="hidden sm:block">Light Mode</span>
              <RiSunFill className=" block sm:hidden text-2xl m-2" />
            </div>
          ) : (
            <div>
              <span className="hidden sm:block">Dark Mode</span>
              <RiMoonClearFill className=" block sm:hidden text-2xl m-2" />
            </div>
          )}
        </button>
      </div>
    </header>
  );
}
