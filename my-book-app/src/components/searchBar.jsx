import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Carousel from "./Carousel";
import {
  searchBooksByTitleAndAuthor,
  getRecommendedBooks,
} from "../services/openLibrary";

function SearchBar() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [randomSubject, setRandomSubject] = useState("");

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);

      const subject = [
        "fiction",
        "fantasy",
        "romance",
        "history",
        "science",
        "mystery",
        "art",
        "biography",
      ];

      let category = subject[Math.floor(Math.random() * subject.length)];
      setRandomSubject(category);
      console.log(category);
      const recommended = await getRecommendedBooks(category);
      setBooks(recommended);
      setLoading(false);
    };

    if (!hasSearched) {
      loadRecommendations();
    }
  }, [hasSearched]);

  const handleSearch = async (event) => {
    event.preventDefault(); //prevent form from reloading the page
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

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
            {loading ? (
              <span className="text-sm">Searching...</span>
            ) : (
              <FaMagnifyingGlass />
            )}
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
      {!hasSearched ? (
        <h1 className="h1-style">{`Recommended Books ~ ${randomSubject
          .charAt(0)
          .toUpperCase()}${randomSubject.slice(1)}`}</h1>
      ) : (
        <h1 className="h1-style">Results</h1>
      )}

      {loading && <p>Loading... </p>}

      {!loading && books.length > 0 && <Carousel books={books} />}
      {!loading && !error && books.length === 0 && <p>No books found</p>}
    </div>
  );
}

export default SearchBar;
