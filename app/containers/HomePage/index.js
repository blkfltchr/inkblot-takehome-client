/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import ContactList from '../ContactList';

export default function HomePage() {
  return (
    <div>
      <ContactList />
    </div>
  );
}
