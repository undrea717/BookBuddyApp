import React from 'react';
import './BookList.css';

function BookList({ books }) {
  if (!books || books.length === 0) return <p className="text-center">No results found.</p>;

  return (
    <div className="book-list">
      {books.map((book) => {
        const coverUrl = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : 'https://via.placeholder.com/150x200?text=No+Cover';

        const handleSave = () => {
          const saved = JSON.parse(localStorage.getItem('readingList')) || [];
          const entry = {
            key: book.key,
            title: book.title,
            author: book.author_name?.join(', ') || 'Unknown Author',
            coverId: book.cover_i,
            year: book.first_publish_year,
          };
          if (!saved.some((b) => b.key === book.key)) {
            saved.push(entry);
            localStorage.setItem('readingList', JSON.stringify(saved));
            alert('Book added to reading list');
          }
        };

        return (
          <div key={book.key} className="book-card">
            <img
              src={coverUrl}
              alt={book.title}
              className="book-cover"
            />
            <h3>{book.title}</h3>
            <p>{book.author_name?.join(', ') || 'Unknown Author'}</p>
            <p>Year: {book.first_publish_year || 'N/A'}</p>
            <button onClick={handleSave}>Add to Reading List</button>
          </div>
        );
      })}
    </div>
  );
}

export default BookList;