import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Trailers from './components/Trailers';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route
          path='/trailers/:imdbId'
          component={Trailers}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
};
export default App;