import Header from "./Header";
import Footer from "./Footer";

import { getBookDetails } from "../services/openLibrary";
import { useState, useEffect } from "react";

function Downloads() {
  // set array of the favorite list
  const [favoriteList, setFavoriteList] = useState([]);
  const [removedIds, setRemovedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const loadFavoriteList = async () => {
      setLoading(true);
      try {
        // Fetch list of favorite id's from local storage
        const storedFavorites = localStorage.getItem("favorites");

        // check if it list exists
        if (storedFavorites) {
          const FavoriteBook = JSON.parse(storedFavorites);
          // fetch book data from the getBookDetails
          const books = await Promise.all(
            FavoriteBook.map((id) => getBookDetails(id))
          );
          setFavoriteList(books);
        }
      } catch (error) {
        console.log("Error fetching favorite books list", error);
        setErrors(error);
      } finally {
        setLoading(false);
      }
    };
    loadFavoriteList();
  }, []);

  const handleToggle = (key) => {
    setRemovedIds((prev) => {
      // check if id on list
      if (prev.includes(key)) {
        // if yes, remove it from the list
        return prev.filter((removedId) => removedId !== key);
      } else {
        // if no, add it to the list
        return [...prev, key];
      }
    });
  };

  // Handle the download
  const handleDownload = () => {
    // get favorite and remove books in removeIds
    let bookDownload = favoriteList.filter(
      (item) => !removedIds.includes(item.key)
    );
    // break down to get an array of bookTitle & bookAuthor
    // joinedArray.join("\n") turn into one big string
    let joinedArray = bookDownload
      .map((book) => `${book.title} ~ ${book.author}`)
      .join("\n");
    const blob = new Blob([joinedArray], { type: "text/plain" });
    // generating  URL for the blob
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "book_list.txt";
    document.body.appendChild(a);
    a.click(); //trigger the download
    document.body.removeChild(a);
    URL.revokeObjectURL(url); //triggers resources releae after download initiate
  };

  return (
    <div>
      <Header />
      <div className="px-4 md:px-12">
        <h1 className="h1-style">Favorite Books List</h1>
        <div className="py-10 flex justify-center h-auto items-center mb-12 md:mb-20">
          <div className="bg-[#F7FCFF] p-4 md:p-10 w-full lg:w-[648px] h-auto flex flex-col md:justify-center items-center rounded-2xl shadow-2xl">
            {loading && favoriteList.length === 0 && errors.length === 0 && (
              <p>Loading favorite books list...</p>
            )}
            {errors && errors.length > 0 && (
              <p>Error loading favorite books list</p>
            )}
            <ul>
              {favoriteList.map((book) => (
                <li className="py-4 flex gap-2">
                  <input
                    type="checkbox"
                    name="book"
                    id="book"
                    checked={removedIds.includes(book.key)}
                    onChange={() => handleToggle(book.key)}
                    className="w-[24px] h-[24px]"
                  />
                  <span
                    className={`text-[16px] ${
                      removedIds.includes(book.key) ? "line-through" : ""
                    }`}
                  >{`${book.title} ~ ${book.author}`}</span>
                  <hr />
                </li>
              ))}
            </ul>
            <button
              className="bg-[#0370A6] w-4/5 text-white text-[20px] font-bold p-4 md:p-6 rounded-xl md:rounded-2xl my-8"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Downloads;
