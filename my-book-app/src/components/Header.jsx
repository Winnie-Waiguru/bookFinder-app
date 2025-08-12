function Header() {
  return (
    <header className="p-4">
      <nav>
        <div>
          <img
            className="w-24 h-12"
            src="\public\Logo.png"
            alt="bookapp-logo"
          />
        </div>
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Favorites</a>
          </li>
          <li>
            <a href="">Download List</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
