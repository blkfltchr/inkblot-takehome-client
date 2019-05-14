import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

const ListContacts = `
query list {
    listContacts {
      items {
        id name type email phonenumber photo
      }
    }
  }
`;

class ContactList extends Component {
  state = {
    contacts: [],
  };

  async componentDidMount() {
    const contacts = await API.graphql(graphqlOperation(ListContacts));
    this.setState({ contacts: contacts.data.listContacts.items });
  }

  render() {
    if (!this.state.contacts) {
      return <h2>Loading...</h2>;
    }
    return (
      <div>
        <h2>Contacts</h2>
        {this.state.contacts.map(contact => (
          <div key={contact.id}>
            <h3>{contact.name}</h3>
            <p>{contact.email}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ContactList;
