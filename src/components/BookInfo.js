import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './BookInfo.css';

function BookInfo() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://openlibrary.org/works/${id}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setBook(data);
      })
      .catch(() => setError('Failed to load book details'));
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!book) return <p>Loading...</p>;

  const coverUrl = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : 'https://via.placeholder.com/150x200?text=No+Cover';

  return (
    <>
      <Navbar />
      <div className="bookdetail">
        <div className="bookdetail-container">
          <div>
            <img
              src={coverUrl}
              alt={book.title}
              style={{ width: '300px', height: '400px', padding: '20px' }}
            />
          </div>
          <div className="ml-8 leading-loose">
            <h5 className="bookdetail-title">Title: {book.title}</h5>
            {book.description && (
              <p className="pt-2 leading-relaxed">
                <span>
                  {typeof book.description === 'string'
                    ? book.description
                    : book.description.value}
                </span>
              </p>
            )}
            <p className="mb-3 font-bold">
              First published: {book.first_publish_date || 'N/A'}
            </p>
            <p className="font-bold">Subjects: {book.subjects?.slice(0, 5).join(', ') || 'N/A'}</p>
            <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">
              <button className="btn-bookdetail">Read More on Open Library</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookInfo;