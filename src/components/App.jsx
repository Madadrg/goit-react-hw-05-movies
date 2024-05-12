// App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import Cast from './components/Cast';
import Reviews from './components/Reviews';

// Import the API key
import config from './config';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* Pass the API key as a prop to Movies component */}
        <Route
          exact
          path="/movies"
          render={() => <Movies apiKey={config.API_KEY} />}
        />
        {/* Pass the API key as a prop to MovieDetails component */}
        <Route
          exact
          path="/movies/:movieId"
          render={props => <MovieDetails {...props} apiKey={config.API_KEY} />}
        />
        {/* Pass the API key as a prop to Cast component */}
        <Route
          exact
          path="/movies/:movieId/cast"
          render={props => <Cast {...props} apiKey={config.API_KEY} />}
        />
        {/* Pass the API key as a prop to Reviews component */}
        <Route
          exact
          path="/movies/:movieId/reviews"
          render={props => <Reviews {...props} apiKey={config.API_KEY} />}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
