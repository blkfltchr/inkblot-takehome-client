import React from 'react';
import PropTypes from 'prop-types';

const ContactCard = props => {
  const { contact } = props;
  return (
    <div>
      <img src={contact.photo} alt={`${contact.name} profile`} />
      <h3>{contact.name}</h3>
      <p>{contact.email}</p>
      <p>{contact.phonenumber}</p>
      <p>{contact.type}</p>
      <button type="button">Edit</button>
      <button type="button">Delete</button>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object,
};

export default ContactCard;
