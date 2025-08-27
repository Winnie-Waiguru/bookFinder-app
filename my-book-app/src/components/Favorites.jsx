import { useState, useEffect } from "react";

import Header from "./Header";
import Carousel from "./Carousel";
import { getBookDetails } from "../services/openLibrary";

function Favorites() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFavoriteBooks = async () => {
      setLoading(true);
      try {
        // get books from local storage
        const stored = localStorage.getItem("favorites");

        // Turn into object and store
        if (stored) {
          const favoritesIds = JSON.parse(stored);

          // await to fetch book for all the ids
          const books = await Promise.all(
            favoritesIds.map((id) => getBookDetails(id))
          );
          setFavoriteBooks(books);
        }
      } catch (error) {
        console.log("Error fetching favorite books", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    loadFavoriteBooks();
  }, []);

  return (
    <div className="">
      <Header />
      <div className="px-4 md:px-12">
        <h1 className="h1-style mt-6">Favorites</h1>
        {loading && favoriteBooks.length === 0 && (
          <p>Loading favorite books...</p>
        )}
        {!loading && favoriteBooks.length === 0 ? (
          <p>No books to display</p>
        ) : (
          <Carousel books={favoriteBooks} />
        )}
      </div>
    </div>
  );
}

export default Favorites;
