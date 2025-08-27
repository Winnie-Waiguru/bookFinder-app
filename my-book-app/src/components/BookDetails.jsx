import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { getBookDetails, getBookEditions } from "../services/openLibrary";

import Header from "./Header";
import { useEffect, useState } from "react";

function BookDetails() {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState("");

  const [isbn, setIsbn] = useState("");
  const [favorites, setFavorites] = useState(() => {
    // get any favorite books stored in local storage
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const loadBookData = async () => {
      try {
        // get book details using book id
        const bookDataDetails = await getBookDetails(bookId);
        setBookData(bookDataDetails);

        // get  book editions(isbn & number of pages)
        const editions = await getBookEditions(bookId);

        // check if isbn is present
        if (editions && editions.entries && editions.entries.length > 0) {
          const firstEdition = editions.entries[0];

          if (firstEdition.isbn_13) {
            setIsbn(firstEdition.isbn_13);
          } else {
            setIsbn(firstEdition.isbn_10);
          }
        }
      } catch (error) {
        console.log("Error loading book details: ", error);
        throw error;
      }
    };
    loadBookData();
  }, [bookId]);

  const handleFavoriteClick = (bookId) => {
    if (!bookId) return; //stop if no book key

    const newFavorites = [...favorites];

    if (newFavorites.includes(bookId)) {
      // find the index of the bookData Key
      let index = newFavorites.indexOf(bookId);
      newFavorites.splice(index, 1); // remove the bookData Key if user click second time
    } else {
      newFavorites.push(bookId); // add the bookData key
    }

    // update the state
    setFavorites(newFavorites);

    // Ensure favorite array persists
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    console.log("new favorites", newFavorites);
  };

  return (
    <div>
      <Header />
      <div className="px-3.5 md:px-12">
        <div className="flex flex-row justify-between py-6 items-center">
          <h1 className="h1-style">Book Details</h1>
          <button
            className="w-[24px] h-[24px] text-center"
            onClick={() => handleFavoriteClick(bookId)}
          >
            <FaHeart
              className={`icon ${
                favorites.includes(bookId) ? "text-red-400" : "text-[#868A88]"
              } `}
            />
          </button>
        </div>
        {bookData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-10 text-[#212121] text-[16px] pb-6">
            <div className="bg-[#F7FCFF] rounded-2xl w-[328px] h-[400px]  lg:w-[352px] lg:h-[492px] flex justify-center items-center col-span-1">
              <img
                className="w-[256px] h-[354px] md:w-[284px] md:h-[418px]"
                src={bookData.cover}
                alt={`${bookData.title} cover`}
              />
            </div>

            <div className="col-span-1 lg:col-span-2">
              <h2 className=" h2-style">{bookData.title}</h2>
              <p className="mb-6">
                by{" "}
                <span className="text-[#0370A6] underline">
                  {bookData.author}
                </span>
              </p>
              <h2 className="h2-style">Description</h2>
              <p className="leading-12 mb-6 whitespace-normal">
                {bookData.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p>
                  <strong>Publication Date: </strong>
                  {bookData.publish_date || "Not found"}
                </p>
                <p>
                  <strong>ISBN: </strong>
                  {isbn || "Not found"}
                </p>
                <p>
                  <strong>Number of Pages:</strong> Not found
                </p>
                <p>
                  <strong>Subjects: </strong>
                  {bookData.subjects}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default BookDetails;
