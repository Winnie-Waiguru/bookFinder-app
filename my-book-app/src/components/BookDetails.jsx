import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import {
  getBookDetails,
  getAuthorName,
  getBookEditions,
} from "../services/openLibrary";

import Header from "./Header";
import { useEffect, useState } from "react";

function BookDetails() {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState("");
  const [author, setAuthor] = useState("Unknown Author");
  // const [pages, setPages] = useState("");
  const [isbn, setIsbn] = useState("");

  useEffect(() => {
    const loadBookData = async () => {
      try {
        // get book details using book id
        const bookDataDetails = await getBookDetails(bookId);
        setBookData(bookDataDetails);

        // fetch author name if authors exist
        if (bookDataDetails.authors && bookDataDetails.authors.length > 0) {
          const authorKey = bookDataDetails.authors[0].author.key;
          const authorDetails = await getAuthorName(authorKey);
          setAuthor(authorDetails.name);
        }

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

  return (
    <div>
      <Header />
      <div className="px-4 md:px-12">
        <div className="flex flex-row justify-between py-6 items-center">
          <h1 className="h1-style">Book Details</h1>
          <button className="w-[24px] h-[24px]">
            <FaHeart className="icon" />
          </button>
        </div>
        {bookData && (
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-6 mt-10 text-[#212121] text-[16px] pb-6">
            <div className="bg-[#F7FCFF] rounded-2xl w-[348px] h-[400px]  md:w-[352px] md:h-[492px] flex justify-center items-center col-span-1">
              <img
                className="w-[256px] h-[354px] md:w-[284px] md:h-[418px]"
                src={`
https://covers.openlibrary.org/b/id/${bookData.covers?.[0]}-M.jpg`}
                alt={`${bookData.title} cover`}
              />
            </div>

            <div className="col-span-2">
              <h2 className=" h2-style">{bookData.title}</h2>
              <p className="mb-6">
                by <span className="text-[#0370A6] underline">{author}</span>
              </p>
              <h2 className="h2-style">Description</h2>
              <p className="leading-12 mb-6 whitespace-normal">
                {" "}
                {typeof bookData.description === "string"
                  ? bookData.description
                  : bookData.description?.value}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p>
                  <strong>Publication Date: </strong>
                  {bookData.first_publish_date}
                </p>
                <p>
                  <strong>ISBN: </strong>
                  {isbn}
                </p>
                <p>
                  <strong>Number of Pages:</strong>
                </p>
                <p>
                  <strong>Subjects: </strong>
                  {bookData.subjects?.slice(0, 3).join(",")}
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
