import Header from "./components/Header";
import SearchBar from "./components/searchBar";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";

function App() {
  return (
    <div style={{ fontFamily: "Merriweather" }} className="py-4 px-4 md:px-16">
      <Header />
      <SearchBar />
      <Carousel />
      <Footer />
    </div>
  );
}

export default App;
