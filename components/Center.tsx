import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const bgColors: any = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-cyan-500",
];
function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(bgColors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data: any) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log(`Oops! You got this error: ${err}`));
  }, [spotifyApi, playlistId]);

  console.log(playlist);
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="text-white flex items-center space-x-2 bg-black opacity-90 hover:opacity-80 p-1 pr-2 cursor-pointer rounded-full"
          onClick={() => signOut}
        >
          <img
            className="rounded-full object-cover h-8 w-8"
            src={session?.user?.image || ""}
            alt="Profile Pic"
          />
          <h2>{session?.user?.name}</h2>
          <BiChevronDown className="w-5 h-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          // @ts-ignore
          src={playlist?.images?.[0]?.url}
          alt="Playlist Image"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {/* @ts-ignore */}
            {playlist?.name}
          </h1>
          {/* @ts-ignore */}
          <small className="text-xs font-medium">{playlist?.description}</small>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
