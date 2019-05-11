import React from 'react';

// Importing Auth from aws-amplify to create sign in function
import { Auth } from 'aws-amplify';

function checkUser() {
  Auth.currentAuthenticatedUser()
    .then(user => console.log({ user }))
    .catch(err => console.log(err));
}

function signOut() {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

const NavBar = () => (
  <div>
    <button type="button" onClick={() => Auth.federatedSignIn()}>
      Sign In
    </button>
    <button type="button" onClick={checkUser}>
      Check User
    </button>
    <button type="button" onClick={signOut}>
      Sign Out
    </button>
  </div>
);

export default NavBar;
