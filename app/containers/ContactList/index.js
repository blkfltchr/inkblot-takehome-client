import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { API, graphqlOperation } from 'aws-amplify';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
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
  fullButton: {
    width: '100%',
    margin: '20px auto',
  },
};

function ContactList(props) {
  const [contacts, setContacts] = useState([]);
  const [tab, setTab] = useState(0);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function fetchContacts() {
      const contactsData = await API.graphql(graphqlOperation(ListContacts));
      setContacts(contactsData.data.listContacts.items);
    }
    fetchContacts();
  }, [ListContacts]);

  const handleTabs = (e, value) => {
    setTab(value);
  };

  const searchContacts = () => {
    if (searchText.length > 0) {
      const newText = searchText.replace(/\\$/, '');
      const searchRegex = new RegExp(newText, 'gi');
      return contacts.filter(contact => contact.name.match(searchRegex));
    }
    return contacts;
  };

  const filterContacts = () => {
    if (tab === 1) {
      return searchContacts().filter(contact => contact.type === 'Friends');
    }
    if (tab === 2) {
      return searchContacts().filter(contact => contact.type === 'Family');
    }
    if (tab === 3) {
      return searchContacts().filter(contact => contact.type === 'Network');
    }
    return searchContacts();
  };

  const { classes } = props;
  return (
    <div className={classes.root}>
      <h2>Contacts</h2>
      <Tabs
        value={tab}
        onChange={handleTabs}
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
          onChange={e => setSearchText(e.target.value)}
        />
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {filterContacts().map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
      <Link to="/add">
        <Button
          variant="contained"
          color="primary"
          className={classes.fullButton}
        >
          <AddIcon />
          Add a contact
        </Button>
      </Link>
    </div>
  );
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactList);
