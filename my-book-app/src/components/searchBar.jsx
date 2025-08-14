import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(`${searchTerm}`); //Testing purposes
  };

  return (
    <div className="mt-2 m-auto border border-[#0370A6] rounded-xl pr-3 flex justify-between md:w-2xl lg:w-4xl xl:w-5xl h-[60px] md:h-[64px] items-center">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        className="w-3/4 h-[60px] md:h-[64px] p-3 focus:outline-none"
      />
      <button>
        <FaMagnifyingGlass className="icon md:hidden" />
      </button>
      <button className="hidden md:block bg-[#0370A6] text-[#ffffff]  p-4 w-[216px] rounded-xl font-bold font-xl">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
