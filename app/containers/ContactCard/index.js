import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteContact from '../DeleteContact';
import * as mutations from '../../graphql/mutations';

const styles = theme => ({
  card: {
    display: 'flex',
    height: 'auto',
    maxWidth: 500,
    width: '90%',
    margin: '20px auto',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: 200,
    },
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
    minWidth: 150,
    maxWidth: 150,
    minHeight: 150,
    maxHeight: 150,
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

  render() {
    const { contact, classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={contact.photo}
          title={`${contact.name} profile`}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {contact.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {contact.type}
            </Typography>
            <a href={`mailto:${contact.email}`}>
              <Typography component="p" color="primary">
                {contact.email}
              </Typography>
            </a>
            <Typography component="p">{contact.phonenumber}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Edit contact">
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete contact"
              onClick={this.handleClickOpen}
            >
              <DeleteIcon />
            </IconButton>
            <DeleteContact
              open={this.state.open}
              handleClose={this.handleClose}
              handleDelete={this.handleDelete}
              contact={contact}
            />
          </CardActions>
        </div>
      </Card>
    );
  }
}

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ContactCard);
