// src/App.jsx
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
import Navigation from './Navigation/Navigation';
import config from './Config/config';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies apiKey={config.API_KEY} />} />
        <Route
          path="/movies/:movieId"
          element={<MovieDetails apiKey={config.API_KEY} />}
        >
          <Route path="cast" element={<Cast apiKey={config.API_KEY} />} />
          <Route path="reviews" element={<Reviews apiKey={config.API_KEY} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
