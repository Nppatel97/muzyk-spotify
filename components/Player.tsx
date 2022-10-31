import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import {
  BiRepeat,
  BiSkipNext,
  BiSkipPrevious,
  BiVolumeFull,
  BiVolumeMute,
} from "react-icons/bi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { TbDevices2 } from "react-icons/tb";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { TiArrowShuffle } from "react-icons/ti";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  // Addtypeslater
  const songInfo: any = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data: any) => {
        setCurrentTrackId(data.body?.item?.id);
      });

      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setIsPlaying(data.body.is_playing);
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (volume >= 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 500),
    []
  );

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div className="h-24 bg-zinc-900 text-white grid grid-cols-3 pr-4 text-xs md:text-base px-4 border-t border-gray-800">
      {/* Left side */}
      <div className="flex items-center space-x-4 ">
        <img
          className="inline h-18 w-18"
          src={songInfo?.album.images?.[0].url}
          alt="Current Song album image"
        />
        <div>
          <h3 className="font-semibold text-lg">{songInfo?.name}</h3>
          <p className="text-sm text-gray-400">
            {songInfo?.artists?.[0]?.name}
          </p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <TiArrowShuffle className="button" />
        <BiSkipPrevious className="button w-6 h-6" />
        {isPlaying ? (
          <BsPauseFill
            onClick={() => handlePlayPause()}
            className="bg-white rounded-full w-8 h-8 p-1 text-black hover:scale-105"
          />
        ) : (
          <BsPlayFill
            onClick={() => handlePlayPause()}
            className="bg-white rounded-full w-8 h-8 p-1 text-black hover:scale-105"
          />
        )}

        <BiSkipNext className="button w-6 h-6" />
        <BiRepeat className="button rotate-180" />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end">
        <HiOutlineQueueList className="button" />
        <TbDevices2 className="button cursor-not-allowed" />
        {volume > 0 ? (
          <BiVolumeFull
            onClick={() => volume > 0 && setVolume(0)}
            className="button"
          />
        ) : (
          <BiVolumeMute onClick={() => setVolume(50)} className="button" />
        )}

        <input
          type="range"
          name="volume"
          id="volume"
          value={volume}
          min={0}
          max={100}
          className="h-1 w-14 md:w-28"
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Player;
