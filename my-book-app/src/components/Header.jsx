import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <header
      className={`${
        isActive
          ? "w-[300px] bg-[#F7FCFF] rounded-tr-4xl shadow-[2px_0_2px_rgba(0,0,0,0.2)]"
          : "w-full bg-transparent"
      } relative px-4 md:px-12`}
    >
      <nav className=" py-4  h-16 flex justify-between items-center ">
        <img
          className={`w-24 h-12 ${
            isActive && "hidden"
          } md:block md:w-28 md:h-14`}
          src="\Logo.png"
          alt="bookapp-logo"
        />

        {/* Desktop Menu */}

        <ul className=" hidden font-bold md:flex flex-row gap-20 text-xl px-4">
          <Link to={"/"} className="nav-items">
            Home
          </Link>
          <Link to={"/favorites"} className="nav-items">
            Favorites
          </Link>
          <Link to={"/downloads"} className="nav-items">
            Downloads
          </Link>
        </ul>

        {/* Mobile View menu */}
        {isActive && (
          <div className="absolute top-[64px] left-0 bg-[#F7FCFF] w-[300px] font-bold shadow-[2px_0_2px_rgba(0,0,0,0.2)]">
            <ul className="flex flex-col gap-6 h-screen items-center justify-evenly ">
              <Link to={"/"} className="sideItems-hover">
                Home
              </Link>
              <Link to={"/favorites"} className="sideItems-hover">
                Favorites
              </Link>
              <Link to={"/downloads"} className="sideItems-hover">
                Downloads
              </Link>

              <li className="sideItems-hover">
                <a href=""></a>
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
