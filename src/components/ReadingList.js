import React, { useEffect, useState } from 'react';
import { getReadingList } from '../utils/localStorage';

function ReadingList() {
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    setReadingList(getReadingList());
  }, []);

  return (
    <div className="container">
      <h1>Your Reading List</h1>
      <div className="book-grid">
        {readingList.length === 0 ? (
          <p>No books saved yet.</p>
        ) : (
          readingList.map((book) => (
            <div className="book-card" key={book.key}>
              <img
                src={
                  book.coverId
                    ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
                    : 'https://via.placeholder.com/150x200?text=No+Cover'
                }
                alt={book.title}
              />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReadingList;
