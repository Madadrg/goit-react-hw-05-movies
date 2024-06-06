// components/Reviews/Reviews.jsx
import React, { useState, useEffect } from 'react';
import API_KEY from '../Config/config';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  // Use the API key directly
  const apiKey = '5b28406cf15f01386b735b4e48c0f3f4';

  // State for storing reviews, loading state, and error state
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get movieId from URL params
  const { movieId } = useParams();

  // Fetch reviews when component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [apiKey, movieId]); // Make sure to include apiKey and movieId as dependencies for useEffect

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render fetched reviews
  return (
    <div>
      <h2>Reviews</h2>
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review">
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
