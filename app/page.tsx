"use client";

import Link from "next/link";

import { outnowdata } from "@/data";

import type React from "react";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function OuijaBoard() {
  const [message, setMessage] = useState<string>("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 20, stiffness: 400 });
  const springY = useSpring(y, { damping: 20, stiffness: 400 });

  // Letters and options on the board
  const letters = [
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["K", "L", "M", "N", "O", "P", "Q", "R", "S"],
    ["T", "U", "V", "W", "X", "Y", "Z"],
  ];


  // Handle planchette movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    x.set(offsetX - 50); // Center the planchette on cursor
    y.set(offsetY - 50);

    // Detect if planchette is over a letter or option
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const letterElement = elements.find(
      (el) => el.classList.contains("letter") || el.classList.contains("option")
    );

    if (letterElement) {
      const letter = letterElement.getAttribute("data-letter");
      setSelectedLetter(letter);
    } else {
      setSelectedLetter(null);
    }
  };

  // Add letter to message when clicked
  const handleClick = () => {
    if (selectedLetter) {
      if (selectedLetter === "GOODBYE") {
        setMessage((prev) => prev + " 👋");
      } else {
        setMessage((prev) => prev + selectedLetter);
      }
    }
  };

  // Clear the message
  const clearMessage = () => {
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
      <div
        className="relative w-full aspect-[4/3] bg-amber-900 rounded-3xl border-4 border-amber-700 shadow-2xl overflow-hidden"
        ref={boardRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] opacity-10"></div>

        {/* Sun and moon symbols */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <div className="w-16 h-16 bg-amber-300 rounded-full opacity-20"></div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="w-12 h-12 bg-amber-300 rounded-full opacity-20"></div>
        </div>

        {/* Options (YES, NO, GOODBYE) */}
        <div
          className="absolute top-8 left-8 text-amber-300 text-xl font-serif option"
          data-letter="YES"
        >
          YES
        </div>
        <div
          className="absolute top-8 right-8 text-amber-300 text-xl font-serif option"
          data-letter="NO"
        >
          NO
        </div>
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-300 text-xl font-serif option"
          data-letter="GOODBYE"
        >
          GOODBYE
        </div>

        {/* Letters */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8 w-full">
          {letters.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-6">
              {row.map((letter) => (
                <div
                  key={letter}
                  className="text-amber-300 text-2xl font-serif letter"
                  data-letter={letter}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Numbers */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex justify-center gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <div
              key={num}
              className="text-amber-300 text-2xl font-serif letter"
              data-letter={num.toString()}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Planchette */}
        <motion.div
          className="absolute w-24 h-24 pointer-events-none"
          style={{
            x: springX,
            y: springY,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <path
              d="M50 10 L90 70 L50 90 L10 70 Z"
              fill="rgba(245, 158, 11, 0.7)"
              stroke="rgba(217, 119, 6, 0.9)"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="10" fill="rgba(255, 255, 255, 0.3)" />
          </svg>
        </motion.div>
      </div>

      {/* Message display */}
      <div className="bg-gray-900 p-4 rounded-lg w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-amber-300 font-serif">Message from beyond:</h3>
          <button
            onClick={clearMessage}
            className="text-xs text-amber-300 border border-amber-700 px-2 py-1 rounded hover:bg-amber-900/30"
          >
            Clear
          </button>
        </div>
        <p className="text-amber-100 font-serif text-xl min-h-[2rem]">
          {message || "..."}
        </p>
      </div>

      <p className="text-gray-500 text-sm text-center max-w-md">
        Move your cursor over the board and click to select letters and options.
        This is for entertainment purposes only.
      </p>
    </div>
  );
}

function outNow() {
  if (outnowdata != undefined) {
    return (
      <div className="flex absolute text-center">
        <div className="p-5 bg-red-900">
          <p className="text-5xl w-screen thick">
            {`"${outnowdata["title"]}"`} OUT NOW
          </p>
        </div>
      </div>
    );
  }
}

export default function Home() {
  return (
    <div>
      {outNow()}
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-7xl font-rock-salt">
            PHYSCIAL PHY SCENE
          </h1>
          <p>
            Based in Crestivew, FL. PHYSCIALPHYSCENE is a band that creates
            INDUSTRIAL,ROCK,INDIE,ALT music.
          </p>
          <div className="gap-4 flex flex-col w-full">
            <Link
              href={"https://www.instagram.com/physcialplysc3ne"}
              target="_blank"
              className="hover:text-red-900 hover:bg-white bg-red-900 p-2 rounded-sm w-full text-white text-lg font-semibold"
            >
              JOIN US ON INSTAGRAM
            </Link>
            <Link
              href={"/stream"}
              className="hover:text-red-900 hover:bg-white bg-red-900 p-2 rounded-sm w-full text-white text-lg font-semibold"
            >
              LISTEN TO OUR MUSIC
            </Link>
          </div>
        </main>
      </div>
      <footer>
        <div className="flex flex-col text-center justify-center p-4 text-sm text-gray-500">
          <div className="flex justify-center mb-32">
            <OuijaBoard />
          </div>
          <p>&copy; {new Date().getFullYear()} PHYSCIAL PHY SCENE</p>
          <p>
            <Link
              href="https://www.instagram.com/myferr.r"
              className="text-red-900 hover:bg-white"
            >
              DEVELOPED BY DENNIS / @myferr
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
