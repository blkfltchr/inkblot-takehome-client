import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { API, graphqlOperation } from 'aws-amplify';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ContactCard from '../ContactCard';

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
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 500,
    width: '90%',
    margin: '20px auto 0 auto',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
};

class ContactList extends Component {
  state = {
    contacts: [],
    value: 0,
    searchText: '',
  };

  async componentDidMount() {
    const contacts = await API.graphql(graphqlOperation(ListContacts));
    this.setState({ contacts: contacts.data.listContacts.items });
  }

  handleTabs = (event, value) => {
    this.setState({ value });
  };

  handleSearch = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchContacts = () => {
    if (this.state.searchText.length > 0) {
      const newText = this.state.searchText.replace(/\\$/, '');
      const searchRegex = new RegExp(newText, 'gi');
      return this.state.contacts.filter(contact =>
        contact.name.match(searchRegex),
      );
    }
    return this.state.contacts;
  };

  filterContacts = () => {
    if (this.state.value === 1) {
      return this.searchContacts().filter(
        contact => contact.type === 'Friends',
      );
    }
    if (this.state.value === 2) {
      return this.searchContacts().filter(contact => contact.type === 'Family');
    }
    if (this.state.value === 3) {
      return this.searchContacts().filter(
        contact => contact.type === 'Network',
      );
    }
    return this.searchContacts();
  };

  render() {
    const { classes } = this.props;
    const { contacts, value, searchText } = this.state;
    if (!contacts) {
      return <h2>Please add a contact...</h2>;
    }
    return (
      <div className={classes.root}>
        <h2>Contacts</h2>
        <Tabs
          value={value}
          onChange={this.handleTabs}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab className={classes.tab} label="All" />
          <Tab className={classes.tab} label="Friends" />
          <Tab className={classes.tab} label="Family" />
          <Tab className={classes.tab} label="Network" />
        </Tabs>
        <Paper className={classes.search} elevation={1}>
          <InputBase
            name="searchText"
            value={searchText}
            className={classes.input}
            placeholder="Search contacts"
            onChange={this.handleSearch}
          />
          <IconButton className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Paper>
        {this.filterContacts().map(contact => (
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
