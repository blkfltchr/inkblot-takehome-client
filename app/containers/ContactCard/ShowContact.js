import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteContact from '../DeleteContact';

const ShowContact = props => {
  const {
    classes,
    contact,
    open,
    handleEdit,
    handleClickOpen,
    handleClose,
    handleDelete,
  } = props;
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
          <IconButton aria-label="Edit contact" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete contact" onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
          <DeleteContact
            open={open}
            handleClose={handleClose}
            handleDelete={handleDelete}
            contact={contact}
          />
        </CardActions>
      </div>
    </Card>
  );
};

ShowContact.propTypes = {
  contact: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  handleClickOpen: PropTypes.func,
  handleClose: PropTypes.func,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
};

export default ShowContact;
