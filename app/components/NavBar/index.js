import React from 'react';
import { Auth } from 'aws-amplify';

function signOut() {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

const NavBar = () => (
  <div>
    <span>Home</span>
    <button type="button" onClick={signOut}>
      Sign out
    </button>
  </div>
);

export default NavBar;
