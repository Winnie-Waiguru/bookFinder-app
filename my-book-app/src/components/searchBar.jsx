import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import Carousel from "./Carousel";
import { searchBooksByTitleAndAuthor } from "../services/openLibrary";

function SearchBar() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault(); //prevent form from reloading the page
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const fetchedBooks = await searchBooksByTitleAndAuthor(searchTerm);
      setBooks(fetchedBooks);
      if (fetchedBooks.length === 0) setError("No books found");
    } catch (error) {
      setError("Failed to fetch books.Please try again.");
      console.error(error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(`${searchTerm}`); //Testing purposes
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="mt-2 m-auto border border-[#0370A6] rounded-xl pr-3 flex justify-between md:w-2xl lg:w-4xl xl:w-5xl h-[60px] md:h-[64px] items-center">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={handleChange}
            className="w-3/4 h-[60px] md:h-[64px] p-3 focus:outline-none"
          />
          <button type="submit" disabled={loading} className="icon md:hidden">
            {loading ? "Searching... " : <FaMagnifyingGlass />}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="hidden md:block bg-[#0370A6] text-[#ffffff]  p-4 w-[216px] rounded-xl font-bold font-xl"
          >
            {loading ? "Searching... " : "Search"}
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
      <h2 className="text-xl md:text-2xl font-bold mt-6 text-[#212121]">
        Results
      </h2>

      {loading && <p>Loading... </p>}

      {!loading && books.length > 0 && <Carousel books={books} />}
      {!loading && !error && books.length === 0 && <p>No books found</p>}
    </div>
  );
}

export default SearchBar;
