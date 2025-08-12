# Book Library Application

A React-based web application that allows users to search for books, view details, save favorites, get genre-based recommendations, and download a reading list to share with friends.


## Project Idea

The **Book Library Application** is designed to make book discovery and sharing easy and engaging. Users can:

- **Search** for books using the Google Books API
- **View details** such as title, author, cover, and description
- **Favorite** books (saved locally, no login required)
- Get **genre-based recommendations** from favorites
- **Download** a list of read books in `.txt` or `.pdf` format for sharing



## Key Features

### 1. Search Books

- Enter search terms to look up books
- View results with covers, titles, and authors

### 2. View Book Details

- Click a book to see:
  - Description
  - Publication date
  - Page count
  - Preview link

### 3. Favorite Books

- Add books to a **Favorites** list

### 4. Recommendations

- Generate suggestions based on genres in the user’s favorites

### 5. Download Read List

- Mark books as **Read**
- Export reading list as `.txt` or `.pdf` for sharing



## API

- **Google Books API** – Used for searching and retrieving book data.



## React Components

| Component            | Description                                 |
| -------------------- | ------------------------------------------- |
| **App**              | Root component & routing                    |
| **Header**           | Navigation & branding                       |
| **SearchBar**        | Input field for search queries              |
| **BookList**         | Displays search or recommended books        |
| **BookCard**         | Small preview (image, title, author, genre) |
| **BookDetail**       | Detailed book info                          |
| **Favorites**        | List of favorited books                     |
| **Recommendations**  | Suggested books from user preferences       |
| **ReadListDownload** | Exports user's read list                    |
| **Footer**           | Application footer                          |



## Tech Stack

- **Frontend:** React, Tailwind CSS
- **API:** Google Books API
- **Deployment:** Vercel


## Installation

```bash
# Clone the repository
git clone https://github.com/Winnie-Waiguru/book-library-app.git

# Navigate to the project directory
cd book-library-app

# Install dependencies
npm install

# Run the development server
npm start
```
