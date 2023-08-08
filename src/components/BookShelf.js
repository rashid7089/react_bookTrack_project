import Book from "./Book";
import { PropTypes } from "prop-types"
function BookShelf({ onUpdateShelf, allShelfs, shelf, books }) {


  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
                key={"bookShelf__" + book.title + "_book" + book.shelf + "_shelf"}
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

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  allShelfs: PropTypes.object.isRequired,
  shelf: PropTypes.string.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
}

export default BookShelf;