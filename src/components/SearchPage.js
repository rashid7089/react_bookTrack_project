import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Book from "./Book";
import { PropTypes } from "prop-types"
import {search as searchResults } from "../BooksAPI";

function SearchPage({ books, allShelfs, onUpdateShelf}) {

    const [displayedBooks, setdisplayedBooks] = useState(books);
    const [searchTerm, setsearchTerm] = useState("");
    const [abortController, setabortController] = useState(new AbortController());
    useEffect(() => {
      searchBooks(searchTerm); // update displayedBooks to books, when ever books updated

      return () => {
        abortController.abort(); // abort the previous search
      }
    }, [books]);
    

    const searchBooks = (newSearchTerm) => {
        // abort the previous search (if the user is typing very fast, we don't need the previous search results)
        abortController.abort(); 
        // --------------------------------

        setsearchTerm(newSearchTerm); // update the feild 
        if (newSearchTerm === "") setdisplayedBooks(books);
        else {
            const newAbortController = new AbortController(); // create a new abort control
            setabortController(newAbortController); // update the abort controller
            
            // search for the new term
            searchResults(newSearchTerm, 10, newAbortController.signal).then((newB) => {
              if (newB.error) setdisplayedBooks([]);
              else {
                newB.forEach((book) => {
                  // update the shelf of the book
                  const foundBook = books.find((b) => b.id === book.id);
                  if (foundBook) book.shelf = foundBook.shelf;
                  else book.shelf = "none";
                });
                setdisplayedBooks(newB);
              }
          }).catch((error) => {}); // if the user abort the search, don't update the state
        }
    };


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => searchBooks(e.target.value)}
              placeholder="Search by title, author, or ISBN"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {displayedBooks.map((book, i) => (
              <Book
                key={"searchPage" + book.title + "_book" + i + "s" + book.shelf + "_shelf"}
                book={book}
                onUpdateShelf={onUpdateShelf}
                allShelfs={allShelfs}
              />
            ))}
          </ol>
        </div>
      </div>
    );
}

SearchPage.propTypes = {
  books: PropTypes.array.isRequired,
  allShelfs: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
}

export default SearchPage;