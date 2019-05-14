/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ContactList from '../ContactList';

export default function HomePage() {
  return (
    <div>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <ContactList />
    </div>
  );
}
