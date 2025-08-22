import { useRef, useState, useEffect } from "react";
import BookCard from "./bookCard";
import { motion } from "framer-motion";

function Carousel({ books = [] }) {
  const carouselRef = useRef(null);
  const [dragDirection, setDragDirection] = useState("x"); //drag direction default set to large screens

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

  //Detect window resize
  useEffect(() => {
    const updateDrag = () => {
      if (window.innerWidth < 768) {
        setDragDirection("y"); //small screens
      } else {
        setDragDirection("x");
      }
    };

    updateDrag(); //run at Mount
    window.addEventListener("resize", updateDrag);
    return () => window.removeEventListener("resize", updateDrag);
  }, []);

  if (!books.length) return null;

  return (
    <div className="h-auto md:h-[440px] md:max-w-[2000px] mt-6 mx-auto ">
      <div
        ref={carouselRef}
        className="h-full flex items-center justify-center overflow-hidden md:overflow-hidden overflow-y-auto md:overflow-y-hidden"
      >
        <motion.div
          className="flex flex-col md:flex-row gap-12 md:gap-20 px-4"
          drag={dragDirection === "x" ? "x" : false}
          dragConstraints={dragDirection === "x" ? carouselRef : undefined}
          dragElastic={0.2}
        >
          {books.map((book, index) => (
            <div
              className="bookItem"
              key={
                book.key || `${book.title}-${book.author || "unknown"}-${index}`
              }
            >
              <BookCard
                img={getCoverUrl(book)}
                title={book.title}
                author={formatAuthors(book.author_name || book.author, 40)}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Carousel;
