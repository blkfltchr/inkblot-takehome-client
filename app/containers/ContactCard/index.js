import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { API, graphqlOperation } from 'aws-amplify';
import PropTypes from 'prop-types';
import * as mutations from '../../graphql/mutations';
import ShowContact from './ShowContact';
import EditContact from './EditContact';

const styles = theme => ({
  card: {
    display: 'flex',
    height: 'auto',
    maxWidth: 500,
    width: '90%',
    margin: '20px auto',
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90%',
  },
  content: {
    flex: '1 0 auto',
  },
  actions: {
    display: 'flex',
  },
  cover: {
    minWidth: 100,
    maxWidth: 100,
    minHeight: 100,
    maxHeight: 100,
    [theme.breakpoints.up('sm')]: {
      minWidth: 200,
      maxWidth: 200,
      minHeight: 200,
      maxHeight: 200,
    },
  },
});

function ContactCard(props) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async id => {
    try {
      const input = { id };
      await API.graphql(graphqlOperation(mutations.deleteContact, { input }));
      console.log(`${id} successfully deleted.`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    setIsEditing(isEditing => !isEditing);
  };

  const { contact, classes } = props;
  if (!isEditing) {
    return (
      <ShowContact
        classes={classes}
        contact={contact}
        open={open}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    );
  }
  return (
    <EditContact
      classes={classes}
      contact={contact}
      open={open}
      handleEdit={handleEdit}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
    />
  );
}

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ContactCard);
