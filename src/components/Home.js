
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

function Home({ books, allShelfs, onUpdateShelf}) {

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
                  onUpdateShelf={onUpdateShelf}
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

Home.propTypes = {
  books: PropTypes.array.isRequired,
  allShelfs: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
}

export default Home;
