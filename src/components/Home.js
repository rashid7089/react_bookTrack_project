
import { useState } from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";


function Home({ books, allShelfs, changeShelf}) {

  return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {Object.keys(allShelfs).map((shelfCode) => (
                <BookShelf
                  key={shelfCode + "__shelf"}
                  books={books.filter((book) => book.shelf === shelfCode)}
                  allShelfs={allShelfs}
                  shelf={allShelfs[shelfCode]}
                  changeShelf={changeShelf}
                />
              ))}
            </div>
          </div>
          <div className="open-search">
              <Link to="/search">Add a book</Link>
          </div>
        </div>
  );
}

export default Home;
