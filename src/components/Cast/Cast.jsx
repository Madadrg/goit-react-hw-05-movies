import React from 'react';
import { useParams } from 'react-router-dom';

const Cast = ({ apiKey }) => {
  const { movieId } = useParams();
  const [cast, setCast] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
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
      <h3>Cast</h3>
      <ul>
        {cast.map(member => (
          <li key={member.cast_id}>
            {member.name} as {member.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
