import React from "react";
import { BsPlayFill } from "react-icons/bs";
import useSpotify from "../hooks/useSpotify";
import { convertDateFormat } from "../lib/date";
import { millisToMinutesAndSeconds } from "../lib/time";
// Add types
function Song({ order, track }: any) {
  const spotifyApi = useSpotify();
  return (
    <div className="grid grid-cols-2 text-gray-400 py-2 px-5 hover:bg-gray-900 rounded-md group cursor-pointer">
      <div className="flex items-center space-x-4 relative">
        <p>{order + 1}</p>
        <p className="group-hover:opacity-100 absolute -left-6 bg-gray-900 p-1 opacity-0">
          <BsPlayFill className="w-5 h-5" />
        </p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline truncate w-40">
          {track.track.album.name}
        </p>
        <p>{convertDateFormat(track.added_at.split("T")[0])}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
