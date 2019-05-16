import React from 'react';
import { Auth } from 'aws-amplify';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

function signOut() {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

const NavBar = () => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={signOut}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  </div>
);

export default NavBar;
