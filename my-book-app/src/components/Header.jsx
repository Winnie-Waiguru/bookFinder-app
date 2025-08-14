import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <header
      className={`${
        isActive
          ? "w-[300px] bg-[#F7FCFF] rounded-tr-4xl"
          : "w-full bg-transparent"
      } relative`}
    >
      <nav className=" px-6 py-4  h-16 flex justify-between items-center">
        <img
          className={`w-24 h-12 ${isActive && "hidden"} md:block`}
          src="\Logo.png"
          alt="bookapp-logo"
        />

        {/* Desktop Menu */}

        <ul className=" hidden font-bold md:flex flex-row gap-20 text-xl px-10">
          <li className="nav-items">
            <a href="">Home</a>
          </li>
          <li className="nav-items">
            <a href="">Favorites</a>
          </li>
          <li className="nav-items">
            <a href="">Download List</a>
          </li>
        </ul>

        {/* Mobile View menu */}
        {isActive && (
          <div className="absolute top-[64px] left-0 bg-[#F7FCFF] w-[300px] font-bold ">
            <ul className="flex flex-col gap-6 h-screen items-center justify-evenly ">
              <li className="sideItems-hover">
                <a href="">Home</a>
              </li>
              <li className="sideItems-hover">
                <a href="">Favorites</a>
              </li>
              <li className="sideItems-hover">
                <a href="">Download List</a>
              </li>
            </ul>
          </div>
        )}

        <div className="md:hidden">
          {!isActive ? (
            <FaBars className="icon" onClick={() => setIsActive(true)} />
          ) : (
            <FaXmark
              className="icon absolute right-10"
              onClick={() => setIsActive(false)}
            />
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
