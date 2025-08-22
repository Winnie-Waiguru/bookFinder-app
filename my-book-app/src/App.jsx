import Header from "./components/Header";
import SearchBar from "./components/searchBar";
import Carousel from "./components/Carousel";

function App() {
  return (
    <div style={{ fontFamily: "Merriweather" }} className="py-4 px-4 md:px-16">
      <Header />
      <SearchBar />
      <Carousel />
    </div>
  );
}

export default App;
