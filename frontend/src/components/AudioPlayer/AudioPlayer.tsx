"use client";

import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import useAudioPlayer from "./useAudioPlayer";

export const AudioPlayerDesktop = ({ content }: { content: string }) => {
  const { data, methods } = useAudioPlayer({ content });

  return (
    <div className="space-y-6">
      <div className="audio-player flex items-center gap-3  mb-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <div
          className=" p-4  flex items-center gap-4"
          data-purpose="audio-player"
        >
          {!data.isSpeaking || data.isPaused ? (
            <button
              onClick={methods.startSpeaking}
              className="w-14 h-14 rounded-full bg-red-600 pl-1  flex items-center justify-center hover:opacity-90 transition-opacity flex-none cursor-pointer"
            >
              <FaPlay size={24} color="white" />
            </button>
          ) : (
            <button
              onClick={methods.pauseSpeaking}
              className="w-14 h-14 rounded-full bg-red-600  flex items-center justify-center hover:opacity-90 transition-opacity flex-none cursor-pointer"
            >
              <FaPause size={24} color="white" />
            </button>
          )}

          <button
            onClick={methods.stopSpeaking}
            className="w-14 h-14 rounded-full bg-red-600  flex items-center justify-center hover:opacity-90 transition-opacity flex-none cursor-pointer"
          >
            <FaStop size={24} color="white" />
          </button>
          <span className="text-LG font-bold uppercase tracking-widest text-[#0f3d70]">
            Ouvir Notícia
          </span>
          <div className="flex-grow flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-on-surface font-headline-md text-md text-white">
                Ouvir esta notícia
              </span>
            </div>
            {/* <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-green-400"></div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AudioPlayerMobile = ({ content }: { content: string }) => {
  const { data, methods } = useAudioPlayer({ content });

  return (
    <div className="audio-player flex items-center gap-3 p-3 mb-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0f3d70] text-white shadow-md">
        {!data.isSpeaking || data.isPaused ? (
          <button
            onClick={methods.startSpeaking}
            className="w-10 h-10 rounded-full bg-red-600 pl-1  flex items-center justify-center hover:opacity-90 transition-opacity flex-none cursor-pointer"
          >
            <FaPlay size={20} color="white" />
          </button>
        ) : (
          <button
            onClick={methods.pauseSpeaking}
            className="w-10 h-10 rounded-full bg-red-600  flex items-center justify-center hover:opacity-90 transition-opacity flex-none cursor-pointer"
          >
            <FaPause size={20} color="white" />
          </button>
        )}
      </div>
      <button
        onClick={methods.stopSpeaking}
        className="w-10 h-10 rounded-full bg-red-600  flex items-center justify-center hover:opacity-90 transition-opacity flex-none cursor-pointer"
      >
        <FaStop size={20} color="white" />
      </button>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-LG font-bold uppercase tracking-widest text-[#0f3d70]">
            Ouvir Notícia
          </span>
        </div>
        {/* <div className="progress-bar w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="progress-fill h-full bg-[#c1121f] w-[35%]"></div>
        </div> */}
      </div>
    </div>
  );
};
