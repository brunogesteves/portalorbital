"use client";

import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import useAudioPlayer from "./useAudioPlayer";
import { RxResume } from "react-icons/rx";

export default function AudioPlayer({ content }: { content: string }) {
  const { data, methods } = useAudioPlayer({ content });

  return (
    <div className="space-y-6">
      <div className="text-gray-700 font-body-md text-lg leading-relaxed space-y-4 rounded-md w-1/3">
        <div
          className="bg-surface-container-low bg-black rounded-lg p-4 mb-8 flex items-center gap-4 border border-outline-variant shadow-sm"
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
              onClick={methods.pausarFala}
              className="w-14 h-14 rounded-full bg-red-600  flex items-center justify-center hover:opacity-90 transition-opacity flex-none cursor-pointer"
            >
              <FaPause size={24} color="white" />
            </button>
          )}

          <button
            onClick={methods.pararFala}
            className="w-14 h-14 rounded-full bg-red-600  flex items-center justify-center hover:opacity-90 transition-opacity flex-none cursor-pointer"
          >
            <FaStop size={24} color="white" />
          </button>
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
}
