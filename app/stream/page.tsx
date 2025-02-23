"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Pause, Play } from "lucide-react";

import { latestreleases, tracks } from "@/data";

export default function App() {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = (trackName: string) => {
    console.log(`Attempting to play: ${trackName}`);
    const audioSrc = `/audio/${trackName.replaceAll(" ", "-")}.audio.mp3`;

    if (currentTrack === trackName) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Play a new track
      setCurrentTrack(trackName);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = audioSrc;
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <audio ref={audioRef} />
      <Link href="/">
        <button className="p-3">
          <p className="text-5xl w-screen thick">GO BACK</p>
        </button>
      </Link>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-red-900 to-black p-8">
          <h2 className="text-2xl font-bold mb-6">Latest Releases</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {latestreleases.length !== 0 ? (
              latestreleases.map((i) => (
                <TrackItem
                  key={i.name}
                  track={i}
                  isPlaying={isPlaying && currentTrack === i.name}
                  onPlay={() => playAudio(i.name)}
                />
              ))
            ) : (
              <p>
                No music yet!
                <br />
                <Link
                  href={"https://www.instagram.com/physicalplysc3ne"}
                  className="font-extrabold hover:underline"
                >
                  Join us on Instagram
                </Link>
              </p>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-6 mt-24">Songs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {tracks.length !== 0 ? (
              tracks.map((track) => (
                <TrackItem
                  key={track.name}
                  track={track}
                  isPlaying={isPlaying && currentTrack === track.name}
                  onPlay={() => playAudio(track.name)}
                />
              ))
            ) : (
              <p>
                No music yet!
                <br />
                <Link
                  href={"https://www.instagram.com/physicalplysc3ne"}
                  className="font-extrabold hover:underline"
                >
                  Join us on Instagram
                </Link>
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

interface TrackItemProps {
  track: { name: string; artist: string };
  isPlaying: boolean;
  onPlay: () => void;
}

function TrackItem({ track, isPlaying, onPlay }: TrackItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-square overflow-hidden rounded-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={`/covers/${track.name.replaceAll(" ", "-")}.cover.png`}
          alt={`${track.name} by ${track.artist}`}
          width={300}
          height={300}
          className="object-cover transition-all hover:scale-105 cursor-pointer"
        />
        {(isHovered || isPlaying) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <button
              className="rounded-full bg-white p-3 text-black hover:bg-gray-200 transition-colors"
              onClick={onPlay}
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
          </div>
        )}
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{track.name}</h3>
        <p className="text-xs text-muted-foreground">{track.artist}</p>
      </div>
    </div>
  );
}
