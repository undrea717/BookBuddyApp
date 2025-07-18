import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './BookInfo.css';

function BookInfo() {
  const [books, setBooks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${id}&key=${import.meta.env.VITE_SOME_VALUE}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.items || []);
        console.log(data.items);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="bookdetail">
        {books.map((book) => (
          <div key={book.id} className="bookdetail-container">
            <div>
              <img
                src={book.volumeInfo.imageLinks?.smallThumbnail || 'https://via.placeholder.com/150'}
                alt={book.volumeInfo.title}
                style={{ width: '500px', height: '250px', padding: '20px' }}
              />
            </div>
            <div className="ml-8 leading-loose">
              <h5 className="bookdetail-title">Title: {book.volumeInfo.title}</h5>
              {book.volumeInfo.subtitle && <p className="font-bold">Subtitle: {book.volumeInfo.subtitle}</p>}
              <p className="font-bold">Written By: {book.volumeInfo.authors?.join(', ')}</p>
              <p className="mb-3 font-bold">Book published on: {book.volumeInfo.publishedDate}</p>
              <p className="pt-2 leading-relaxed">
                <span>{book.volumeInfo.description}</span>
              </p>
              <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                <button className="btn-bookdetail">Read More About The Book</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BookInfo;
