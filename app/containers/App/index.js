/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { withAuthenticator } from 'aws-amplify-react';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavBar from '../../components/NavBar';
import CreateContact from '../CreateContact';

import GlobalStyle from '../../global-styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF9900',
      contrastText: '#FFF',
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/add" component={CreateContact} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </MuiThemeProvider>
  );
}

export default withAuthenticator(App);
