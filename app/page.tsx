import Link from "next/link";

import { outnowdata } from "@/data";

function outNow() {
  if (outnowdata != undefined) {
    return (
      <div className="flex absolute text-center">
        <div className="p-5 bg-red-900">
          <p className="text-5xl w-screen thick">
            "{outnowdata["title"]}" OUT NOW
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
          <div className="gap-4 flex flex-col w-full">
            <Link
              href={"https://www.instagram.com/physcialplysc3ne"}
              target="_blank"
              className="hover:text-red-900 hover:bg-white bg-red-900 p-2 rounded-sm w-full text-white text-lg font-semibold"
            >
              JOIN US ON INSTAGRAM
            </Link>
            <Link
              href={"/music"}
              className="hover:text-red-900 hover:bg-white bg-red-900 p-2 rounded-sm w-full text-white text-lg font-semibold"
            >
              LISTEN TO OUR MUSIC
            </Link>
          </div>
        </main>
      </div>
      <footer>
        <div className="flex flex-col text-center justify-center p-4 text-sm text-gray-500">
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
