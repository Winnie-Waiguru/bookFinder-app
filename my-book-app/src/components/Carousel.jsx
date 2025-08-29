import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import { motion } from "framer-motion";

function Carousel({ books = [] }) {
  const containerRef = useRef(null);
  const [axis, setAxis] = useState("x"); //drag direction default set to large screens
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  // Get book cover
  const getCoverUrl = (book) => {
    if (book?.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    if (book.cover) {
      return book.cover; // already a full URL from getRecommendedBooks
    }
    // simple placeholder
    return `https://placehold.co/150x220?text=No+Cover`;
  };

  // Format the length of the authors name
  const formatAuthors = (authors, maxLength = 40) => {
    if (!authors) return "Unknown author";

    // check if is an array of authors
    let joined = Array.isArray(authors) ? authors.join(",") : authors;

    if (joined.length <= maxLength) return joined;

    // Slice the  joined array if long
    let truncted = joined.slice(0, maxLength);

    // check if it has cut mid-character
    if (joined[maxLength] !== " ") {
      truncted = truncted.slice(0, truncted.lastIndexOf(" "));
    }

    return truncted + " ...";
  };

  //Detect Axis
  useEffect(() => {
    const updateAxis = () => {
      if (window.innerWidth < 768) {
        setAxis("y"); //small screens
      } else {
        setAxis("x");
      }
    };

    updateAxis(); //run at Mount
    window.addEventListener("resize", updateAxis);
    return () => window.removeEventListener("resize", updateAxis);
  }, []);

  // Measure overflow and set constraints
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    if (axis === "x") {
      const overflow = el.scrollWidth - el.clientWidth;
      setConstraints({ left: -overflow, right: 0 });
    } else {
      const overflow = el.scrollHeight - el.clientHeight;
      setConstraints({ top: 0, bottom: -overflow });
    }
  }, [books, axis]);

  if (!books.length) return null;

  return (
    <div className="h-auto md:h-[440px] mt-6 mx-auto ">
      <div
        ref={containerRef}
        className="h-full flex md:items-center md:justify-center overflow-hidden "
      >
        <motion.div
          className="flex flex-col md:flex-row gap-12 md:gap-20 px-4"
          drag={axis}
          dragConstraints={constraints}
          dragElastic={0.2}
        >
          {books.map((book, index) => {
            const bookId = book.key.split("/").pop();
            return (
              <div
                className="bookItem"
                key={book.key || `${book.title}-${index}`}
              >
                <Link to={`/book/${bookId}`}>
                  <BookCard
                    img={getCoverUrl(book)}
                    title={book.title}
                    author={formatAuthors(book.author_name || book.author, 40)}
                  />
                </Link>

                {/* Making the book clickable and retrieving path */}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default Carousel;
