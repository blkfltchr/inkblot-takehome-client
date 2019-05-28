import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { API, graphqlOperation } from 'aws-amplify';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import * as mutations from '../../graphql/mutations';

function ShowContact(props) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    async function fetchContact() {
      const contact = await props.contact;
      setName(contact.name);
      setType(contact.type);
      setEmail(contact.email);
      setPhonenumber(contact.phonenumber);
      setPhoto(contact.photo);
    }
    fetchContact();
  }, []);

  const handleSubmit = async () => {
    try {
      const input = {
        id: props.contact.id,
        name,
        type,
        email,
        phonenumber,
        photo,
      };
      await API.graphql(graphqlOperation(mutations.updateContact, { input }));
      console.log('New contact successfully edited.');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const { classes, handleEdit } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={photo}
        title={`${name} profile`}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <TextField
            value={name}
            id="standard-name"
            name="name"
            onChange={e => setName(e.target.value)}
          />
          <Typography variant="subtitle1" color="textSecondary">
            {type}
          </Typography>
          <TextField
            value={email}
            id="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            value={phonenumber}
            id="phonenumber"
            name="phonenumber"
            onChange={e => setPhonenumber(e.target.value)}
          />
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button color="secondary" onClick={handleEdit}>
            Cancel
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

ShowContact.propTypes = {
  contact: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleEdit: PropTypes.func,
};

export default ShowContact;
