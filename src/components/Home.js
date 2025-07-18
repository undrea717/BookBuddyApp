
import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import './Home.css';

function Home() {
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const [url, setUrl] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!url) return;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const results = data.docs || [];

        const filtered = results.filter((book) => {
          if (searchBy === 'title') {
            return book.title?.toLowerCase().includes(query.toLowerCase());
          } else {
            return book.author_name?.some((name) =>
              name.toLowerCase().includes(query.toLowerCase())
            );
          }
        });

        const limited = filtered.slice(0, 10);
        setBooks(limited);
        setError(limited.length === 0 ? 'No results found.' : '');
      })
      .catch(() => setError('Failed to fetch books'));
  }, [url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (query.trim() !== '') {
      setUrl(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="container">
      <h1>Search Books</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by full title or author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <label>
          <input
            type="radio"
            name="searchBy"
            value="title"
            checked={searchBy === 'title'}
            onChange={(e) => setSearchBy(e.target.value)}
          />
          Title
        </label>

        <label>
          <input
            type="radio"
            name="searchBy"
            value="author"
            checked={searchBy === 'author'}
            onChange={(e) => setSearchBy(e.target.value)}
          />
          Author
        </label>

        <button type="submit">Search</button>
      </form>

      {submitted && error && <p className="error">{error}</p>}
      {submitted && !error && <BookList books={books} />}
    </div>
  );
}

export default Home;