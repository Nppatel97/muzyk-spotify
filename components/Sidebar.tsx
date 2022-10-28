import React from "react";
import { BiHome, BiSearch, BiLibrary, BiPlus } from "react-icons/bi";
import { BsBookmarkFill, BsHeartFill } from "react-icons/bs";

function Sidebar() {
  return (
    <div className="text-gray-400 font-semibold p-5 text-sm border-r border-gray-900">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <BiHome className="h-6 w-6" />
          <p>Home</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <BiSearch className="h-6 w-6" />
          <p>Search</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <BiLibrary className="h-6 w-6" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <BiPlus className="h-6 w-6 p-[0.35rem] bg-gray-300 text-gray-900 rounded-sm" />
          <p>Create Playlist</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <BsHeartFill className="h-6 w-6 p-[0.35rem] from-blue-700 via-blue-400 to-green-200 bg-gradient-135 text-white  rounded-sm" />
          <p>Liked Songs</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <BsBookmarkFill className="h-6 w-6 p-[0.35rem] bg-green-800 text-green-400 rounded-sm" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <p className="cursor-pointer hover:text-white">Playlists of you</p>
      </div>
    </div>
  );
}

export default Sidebar;
