function Book({book, allShelfs, changeShelf}) {

    let thumbnail = "";
    let authors = "";

    try {
      thumbnail = book.imageLinks.thumbnail;
    } catch (error) {} // there are no thumbnails, or it might be undefind
    
    try {
      authors = book.authors.join(", ");
    } catch (error) {} // there are no authors, or it might be undefind
    

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${thumbnail})`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select
                defaultValue={book.shelf}
                onChange={(e) => changeShelf(book.id, e.target.value)}
              >
                <option disabled>
                  {" "}
                  Move to...{" "}
                </option>

                {Object.keys(allShelfs).map((shelfCode) => (
                  <option key={`option_${shelfCode}`} value={shelfCode}>
                    {allShelfs[shelfCode]}
                  </option>
                ))}

                <option value="none" >None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    );
}

export default Book;