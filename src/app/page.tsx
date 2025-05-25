import Blog from "./components/Blog/Blog";
import Navbar from "./components/Navbar/navbar";
import Button from "./shared/Button/Button";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <div className="flex p-4 justify-between border-b border-[#3a3c53]">
        <h1 className="text-[#00c6ff] text-[25px] font-bold p-4">My Blog AI</h1>
      </div>
      <Blog />
    </div>
  );
}
