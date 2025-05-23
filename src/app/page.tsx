import Image from "next/image";
import Navbar from "./components/Navbar/navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <div className="flex p-4 justify-between border-b border-[#3a3c53]">
        <h1 className="text-[#00c6ff] text-[25px] font-bold p-4">My Blog AI</h1>
        <button className="bg-[#00c6ff] text-[#1e1e2f] border-none px-6 py-3 rounded-md cursor-pointer text-base font-bold transition duration-300 ease-in-out hover:bg-blue-400 hover:scale-105 inline-block no-underline">
          Create My Blog
        </button>
      </div>
    </div>
  );
}
