function Header() {
  return (
    <header className="md:py-4 md:px-12 ">
      <nav className="h-20 flex flex-col md:flex-row justify-between items-center">
        <div>
          <img className="w-24 h-12" src="\Logo.png" alt="bookapp-logo" />
        </div>
        <div>
          <ul className=" font-bold text-base flex flex-col md:flex-row gap-24 h-full md:h-10 items-center bg-amber-300 ">
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
        </div>

        <div>
          <i class="fa-solid fa-bars icon nav-items"></i>
        </div>
      </nav>
    </header>
  );
}

export default Header;
