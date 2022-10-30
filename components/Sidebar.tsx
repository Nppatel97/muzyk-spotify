import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BiHome, BiSearch, BiLibrary, BiPlus, BiLogOut } from "react-icons/bi";
import { BsBookmarkFill, BsHeartFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const initialPlaylist: any = [];
  const [playlists, setPlaylists] = useState(initialPlaylist);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  console.log(playlistId);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-400 font-semibold p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <BiLogOut className="h-6 w-6" />
          <p>Logout</p>
        </button>
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
        {playlists.map((playlist: any) => (
          <p
            className="cursor-pointer hover:text-white w-[25ch]"
            key={playlist.id}
            onClick={() => {
              setPlaylistId(playlist.id);
            }}
          >
            {playlist.name.length < 25
              ? playlist.name
              : `${playlist.name.substring(0, 22)}...`}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
