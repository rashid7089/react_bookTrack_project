import Book from "./Book";

function BookShelf({ changeShelf, allShelfs, shelf, books }) {


  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
                key={"bookShelf__" + book.title + "_book" + book.shelf + "_shelf"}
                book={book}
                changeShelf={changeShelf}
                allShelfs={allShelfs}
              />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;