import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { API, graphqlOperation } from 'aws-amplify';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ContactCard from '../ContactCard';
import SearchBar from '../../components/SearchBar';

const ListContacts = `
query list {
    listContacts {
      items {
        id name type email phonenumber photo
      }
    }
  }
`;

const styles = {
  root: {
    maxWidth: 600,
    width: '90%',
    margin: '0 auto',
  },
  tab: {
    maxWidth: 100,
    width: '22%',
  },
};

class ContactList extends Component {
  state = {
    contacts: [],
    value: 0,
  };

  async componentDidMount() {
    const contacts = await API.graphql(graphqlOperation(ListContacts));
    this.setState({ contacts: contacts.data.listContacts.items });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    if (!this.state.contacts) {
      return <h2>Please add a contact...</h2>;
    }
    return (
      <div className={classes.root}>
        <h2>Contacts</h2>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab className={classes.tab} label="All" />
          <Tab className={classes.tab} label="Friends" />
          <Tab className={classes.tab} label="Family" />
          <Tab className={classes.tab} label="Network" />
        </Tabs>
        <SearchBar />
        {this.state.contacts.map(contact => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    );
  }
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactList);
