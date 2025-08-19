import Header from "./components/Header";
import SearchBar from "./components/searchBar";
import Carousel from "./components/Carousel";

function App() {
  return (
    <div style={{ fontFamily: "Merriweather" }} className="py-4 px-4 md:px-16">
      <Header />
      <SearchBar />
      <h1 className="text-xl md:text-2xl font-bold mt-6 text-[#212121]">
        Recommended Books
      </h1>
      <Carousel />
    </div>
  );
}

export default App;
