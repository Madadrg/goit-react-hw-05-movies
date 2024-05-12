// components/Search/Search.jsx
import React, { useState, useEffect } from 'react';
import { API_KEY } from '../../config';

const Search = () => {
  // Use the API key directly
  const apiKey = API_KEY;

  // State for storing search results, loading state, and error state
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle search
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setSearchResults(data.results);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render search form and results
  return (
    <div>
      <h2>Search Movies</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>
      <div className="search-results">
        {searchResults.map(result => (
          <div key={result.id} className="search-result">
            <h3>{result.title}</h3>
            <p>{result.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
