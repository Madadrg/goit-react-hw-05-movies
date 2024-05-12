// components/MovieDetails/MovieDetails.jsx
import React, { useState, useEffect } from 'react';
import API_KEY from '../Config/config';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  // Use the API key directly
  const apiKey = API_KEY;

  // State for storing movie details, loading state, and error state
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get movieId from URL params
  const { movieId } = useParams();

  // Fetch movie details when component mounts
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
  }, [apiKey, movieId]); // Make sure to include apiKey and movieId as dependencies for useEffect

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render fetched movie details
  return (
    <div>
      <h2>Movie Details</h2>
      {movieDetails && (
        <div className="movie-details">
          <h3>{movieDetails.title}</h3>
          <p>{movieDetails.overview}</p>
          {/* Render other movie details as needed */}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
