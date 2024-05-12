// App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './Home/Home';
import Movies from './Movies/Movies';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';

// Import the API key
import config from './Config/config';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Pass the API key as a prop to Movies component */}
        <Route path="/movies" element={<Movies apiKey={config.API_KEY} />} />
        {/* Pass the API key as a prop to MovieDetails component */}
        <Route
          path="/movies/:movieId"
          element={<MovieDetails apiKey={config.API_KEY} />}
        />
        {/* Pass the API key as a prop to Cast component */}
        <Route
          path="/movies/:movieId/cast"
          element={<Cast apiKey={config.API_KEY} />}
        />
        {/* Pass the API key as a prop to Reviews component */}
        <Route
          path="/movies/:movieId/reviews"
          element={<Reviews apiKey={config.API_KEY} />}
        />
        <Navigate to="/" />
      </Routes>
    </Router>
  );
}

export default App;
