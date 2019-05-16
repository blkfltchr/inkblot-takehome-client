import React from 'react';
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

const styles = () => ({
  card: {
    display: 'flex',
    height: 200,
    maxWidth: 500,
    width: '90%',
    margin: '20px auto',
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
    minWidth: 200,
    maxWidth: 200,
    minHeight: 200,
    maxHeight: 200,
  },
});

const ContactCard = props => {
  const { contact, classes } = props;
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
          <Typography component="p">{contact.email}</Typography>
          <Typography component="p">{contact.phonenumber}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Edit contact">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete contact">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactCard);
