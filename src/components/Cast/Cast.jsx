// components/Cast/Cast.jsx
import React, { useState, useEffect } from 'react';
import API_KEY from '../Config/config';
import { useParams } from 'react-router-dom';

const Cast = () => {
  // Use the API key directly
  const apiKey = API_KEY;

  // State for storing cast information, loading state, and error state
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get movieId from URL params
  const { movieId } = useParams();

  // Fetch cast information when component mounts
  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch cast information');
        }
        const data = await response.json();
        setCast(data.cast);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCast();
  }, [apiKey, movieId]); // Make sure to include apiKey and movieId as dependencies for useEffect

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render cast information
  return (
    <div>
      <h2>Cast</h2>
      <div className="cast-list">
        {cast.map(actor => (
          <div key={actor.id} className="actor">
            <h3>{actor.name}</h3>
            <p>Character: {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
