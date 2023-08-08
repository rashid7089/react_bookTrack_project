import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import Home from "./components/Home";

import { getAll, update as updateBookInDatabase } from "./BooksAPI";

const allShelfs = {
  "currentlyReading":"Currently Reading",
  "wantToRead":"Want to Read", 
  "read":"Read"
  };

function App() {

  const [books, setbooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);

  const changeShelf = (id, newShelf) => {
    let newBooks = books.map(book => {
      if (book.id === id) {
        updateBookInDatabase(book, newShelf); // update the book in the database
        return {...book, shelf:newShelf}; // update the book in the state
      }
      
      return book;
    })
    setbooks(newBooks);
    
  }

  const GetAllBooks = () => {
    getAll()
      .then((allBooks) => {
        // console.log(allBooks); 
        // there is a problem in the api, please read readme line 1
        allBooks = allBooks.map((book) => {
          // if book shelf is not from the main 3 make it none by defualt
          if (!Object.keys(allShelfs).includes(book.shelf)) book.shelf = "none";
          return book;
        });
        setbooks(allBooks);
        setBooksLoading(false);
      })
  }

  useEffect(() => {
    GetAllBooks();
  }, [])
  
  

  if (booksLoading) return <div>Books are loading...</div>
  else if (books.length === 0) return <div>There are no books in the fetch request</div>;
  else return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              books={books}
              changeShelf={changeShelf}
              allShelfs={allShelfs}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchPage
              books={books}
              changeShelf={changeShelf}
              allShelfs={allShelfs}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
