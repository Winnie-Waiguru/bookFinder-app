import { useRef, useState, useEffect } from "react";
import BookCard from "./bookCard";
import { motion } from "framer-motion";

function Carousel() {
  const carouselRef = useRef(null);
  const [dragDirection, setDragDirection] = useState("x"); //drag direction default set to large screens

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

  return (
    <div className="h-auto md:h-[440px] md:max-w-[2000px] mt-6 mx-auto ">
      <div
        ref={carouselRef}
        className="h-full flex items-center justify-center overflow-y-auto overflow-hidden"
      >
        <motion.div
          className="flex flex-col md:flex-row gap-12 md:gap-20 px-4"
          drag={dragDirection}
          dragConstraints={carouselRef}
          dragElastic={0.2}
        >
          <div className="bookItem">
            <BookCard />
          </div>
          <div className="bookItem">
            <BookCard />
          </div>
          <div className="bookItem">
            <BookCard />
          </div>
          <div className="bookItem">
            <BookCard />
          </div>
          <div className="bookItem">
            <BookCard />
          </div>
          <div className="bookItem">
            <BookCard />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Carousel;
