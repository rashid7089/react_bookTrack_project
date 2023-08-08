import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Book from "./Book";
import { PropTypes } from "prop-types"
import {search as searchResults } from "../BooksAPI";

function SearchPage({ books, allShelfs, onUpdateShelf}) {

    const [displayedBooks, setdisplayedBooks] = useState(books);
    const [searchTerm, setsearchTerm] = useState("");

    useEffect(() => {
        if (!searchTerm) searchBooks(searchTerm); // update displayedBooks to books, when ever books updated
    }, [books]);
    

    const searchBooks = (newSearchTerm) => {
        setsearchTerm(newSearchTerm); // update the feild 
        if (newSearchTerm.trim() === "") setdisplayedBooks(books);
        else {
          // const newB = books.filter(
          //   (book) => {
          //       let titleCheck = book.title && book.title.toLowerCase().includes(newSearchTerm.toLowerCase());
          //       let authorsCheck = book.authors && book.authors.filter((a) =>
          //           a.toLowerCase().includes(newSearchTerm.toLowerCase())
          //         ).length > 0;
          //       let ISBNCheck =book.industryIdentifiers && book.industryIdentifiers.filter((a) =>
          //           a.identifier
          //             .toLowerCase()
          //             .includes(newSearchTerm.toLowerCase())
          //         ).length > 0;
          //       return titleCheck || authorsCheck || ISBNCheck;
          //   }
          // );
          searchResults(newSearchTerm, 10).then((books) => {
            if (books.error) setdisplayedBooks([]);
            else setdisplayedBooks(books.map((book) => {
              // if book shelf is not from the main 3 make it none by defualt
              if (!Object.keys(allShelfs).includes(book.shelf)) book.shelf = "none";
              return book;
            }));
          });
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