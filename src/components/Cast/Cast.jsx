import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Cast = ({ apiKey }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

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
  }, [apiKey, movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
