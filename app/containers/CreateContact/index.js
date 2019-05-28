import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { withRouter } from 'react-router';
import Typography from '@material-ui/core/Typography';
import * as mutations from '../../graphql/mutations';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    width: '90%',
    margin: '0 auto',
  },
  formControl: {
    margin: '10px 0',
  },
});
function CreateContact(props) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = async () => {
    try {
      const input = {
        name,
        type,
        email,
        phonenumber,
        photo,
      };
      setName(name);
      setType(type);
      setEmail(email);
      setPhonenumber(phonenumber);
      setPhoto(photo);
      await API.graphql(graphqlOperation(mutations.createContact, { input }));
      console.log('New contact successfully added.');
      props.history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const { classes } = props;
  return (
    <div>
      <h2>Add a new contact</h2>
      <form onSubmit={handleSubmit} className={classes.root}>
        <FormControl className={classes.formControl}>
          <TextField
            id="standard-name"
            label="Name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="phonenumber"
            label="Phone number"
            name="phonenumber"
            value={phonenumber}
            onChange={e => setPhonenumber(e.target.value)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="type-simple">Relationship</InputLabel>
          <Select
            value={type}
            onChange={e => setType(e.target.value)}
            inputProps={{
              name: 'type',
              id: 'type-simple',
            }}
          >
            <MenuItem value="Friends">Friends</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
            <MenuItem value="Network">Network</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="photo"
            label="Photo"
            name="photo"
            value={photo}
            onChange={e => setPhoto(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Typography color="secondary">* All fields are required.</Typography>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button
            type="button"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  );
}

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CreateContact));
