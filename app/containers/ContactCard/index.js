import React, { Component } from 'react';
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

class ContactCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isEditing: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = async id => {
    try {
      const input = { id };
      await API.graphql(graphqlOperation(mutations.deleteContact, { input }));
      console.log(`${id} successfully deleted.`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  handleEdit = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }));
  };

  render() {
    const { contact, classes } = this.props;
    if (!this.state.isEditing) {
      return (
        <ShowContact
          classes={classes}
          contact={contact}
          open={this.state.open}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          handleClickOpen={this.handleClickOpen}
          handleClose={this.handleClose}
        />
      );
    }
    return (
      <EditContact
        classes={classes}
        contact={contact}
        open={this.state.open}
        handleEdit={this.handleEdit}
        handleClickOpen={this.handleClickOpen}
        handleClose={this.handleClose}
      />
    );
  }
}

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ContactCard);
