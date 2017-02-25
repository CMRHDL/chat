// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App';
import About from './components/About';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <MuiThemeProvider>
    <Router {...props}>
      <Route path="/" component={App} />
      <Route path="/about" component={About} />
    </Router>
  </MuiThemeProvider>
);

export default Routes;
