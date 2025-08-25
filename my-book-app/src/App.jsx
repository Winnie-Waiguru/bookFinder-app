import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./components/Header";
import SearchBar from "./components/searchBar";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import Favorites from "./components/Favorites";
import Downloads from "./components/Downloads";
import BookDetails from "./components/BookDetails";
import NotFoundPage from "./components/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <SearchBar />
        <Carousel />
        <Footer />
      </>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/downloads",
    element: <Downloads />,
  },
  {
    path: "/book/:bookId",
    element: <BookDetails />,
  },
]);

function App() {
  return (
    <div style={{ fontFamily: "Merriweather" }} className="p-0 m-0">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
