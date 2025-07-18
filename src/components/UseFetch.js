import { useState, useEffect } from 'react';

function UseFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!url) return;

    fetch(url)
      .then((res) => res.json())
      .then((result) => setData(result.docs))
      .catch(() => setError('Failed to fetch books'));
  }, [url]);

  return { data, error };
}

export default UseFetch