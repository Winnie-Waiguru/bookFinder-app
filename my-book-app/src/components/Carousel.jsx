import { useRef, useState, useEffect } from "react";
import BookCard from "./bookCard";
import { motion } from "framer-motion";

function Carousel({ books = [] }) {
  const carouselRef = useRef(null);
  const [dragDirection, setDragDirection] = useState("x"); //drag direction default set to large screens

  const getCoverUrl = (book) => {
    if (book?.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    // simple placeholder
    return `https://via.placeholder.com/188x236?text=No+Cover`;
  };

  //   Detect window resize
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
        className="h-full flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="flex flex-col md:flex-row gap-12 md:gap-20 px-4"
          drag={dragDirection}
          dragConstraints={carouselRef}
          dragElastic={0.2}
        >
          {books.map((book) => (
            <div className="bookItem" key={book.key}>
              <BookCard
                img={getCoverUrl(book)}
                title={book.title}
                author={
                  book.author_name?.join(",").slice(0, 20) || "Unknown author"
                }
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Carousel;
