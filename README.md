# Book Library Application

A React-based web application that allows users to search for books, view details, save favorites, and get genre-based recommendations.


## Project Idea

The **Book Library Application** is designed to make book discovery and sharing easy and engaging. Users can:

- **Search** for books using the Google Books API
- **View details** such as title, author, cover, and description
- **Favorite** books (saved locally, no login required)
- Get **genre-based recommendations** on landing page 




## Key Features

### 1. Search Books

- Enter search terms to look up books
- View results with covers, titles, and authors

### 2. View Book Details

- Click a book to see:
  - Title  
  - Author  
  - Description
  - Publication date
  - ISBN
  - Subjects

### 3. Favorite Books

- Add books to a **Favorites** list

### 4. Recommendations

- Generate suggestions based on genres in the user’s favorites



## API

- **Open Library API** – Used for searching and retrieving book data.



## React Components

| Component            | Description                                 |
| -------------------- | ------------------------------------------- |
| **App**              | Root component & routing                    |
| **Header**           | Navigation & branding                       |
| **SearchBar**        | Input field for search queries              |
| **BookList**         | Displays search or recommended books        |
| **BookCard**         | Small preview (image, title, author) |
| **BookDetail**       | Detailed book info                          |
| **Favorites**        | List of favorited books                     |
| **Recommendations**  | Suggested books based on certain topics     |
| **Footer**           | Application footer                          |



## Tech Stack

- **Frontend:** React, Tailwind CSS
- **API:** Open Library API
- **Deployment:** Vercel


## Installation

```bash
# Clone the repository
git clone https://github.com/Winnie-Waiguru/book-library-app.git

# Navigate to the project directory
cd my-book-app

# Install dependencies
npm install

# Run the development server
npm start
```
