import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_OPENLIBRARY_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export const getRecommendedBooks = async (subject = "fantasy") => {
  try {
    const response = await api.get(`/subjects/${subject}.json?limit=14`);

    const data = response.data.works;
    console.log(data); //testing purposes

    return data.map((book) => ({
      title: book.title,
      author: book.authors?.[0]?.name || "Unknown author",
      cover: book.cover_id
        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
        : "https://placehold.co/150x220?text=No+Cover",
    }));
  } catch (error) {
    console.error(`No books found! ${error}`);
    return [];
  }
};

//Search for book title or author
export const searchBooks = async (query, type = "title") => {
  const q = query.trim();
  if (!q) return [];

  try {
    let endpoint = "/search.json?";
    if (type === "author") {
      endpoint += `author=${encodeURIComponent(query)}`;
    } else {
      endpoint += `q=${encodeURIComponent(query)}`;
    }
    const response = await api.get(`${endpoint}`);
    return response.data.docs; // 'docs' contains the array of book results
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

//  Search both title & author, merge results
export const searchBooksByTitleAndAuthor = async (query) => {
  const [titleResults, authorResults] = await Promise.all([
    searchBooks(query, "title"),
    searchBooks(query, "author"),
  ]);

  // Merge and deduplicate results based on a unique identifier (e.g., 'key' or 'olid')
  const mergedResultsMap = new Map();
  [...titleResults, ...authorResults].forEach((book) => {
    if (book.key) {
      // Open Library uses 'key' as a unique identifier for works
      mergedResultsMap.set(book.key, book);
    }
  });

  return Array.from(mergedResultsMap.values());
};
