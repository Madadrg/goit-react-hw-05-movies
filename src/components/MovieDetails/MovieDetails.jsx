import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = ({ apiKey }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovieDetails(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [apiKey, movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Movie Details</h2>
      {movieDetails && (
        <div className="movie-details">
          <h3>{movieDetails.title}</h3>
          <p>{movieDetails.overview}</p>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
