import React, { Component } from 'react';
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

class ShowContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      email: '',
      phonenumber: '',
      photo: '',
    };
  }

  async componentDidMount() {
    const contact = await this.props.contact;
    this.setState({
      name: contact.name,
      type: contact.type,
      email: contact.email,
      phonenumber: contact.phonenumber,
      photo: contact.photo,
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async () => {
    const { name, type, email, phonenumber, photo } = this.state;
    try {
      const input = {
        id: this.props.contact.id,
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

  render() {
    const { classes, handleEdit } = this.props;
    const { name, photo, type, phonenumber, email } = this.state;
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
              onChange={this.handleChange}
            />
            <Typography variant="subtitle1" color="textSecondary">
              {type}
            </Typography>
            <TextField
              value={email}
              id="email"
              name="email"
              onChange={this.handleChange}
            />
            <TextField
              value={phonenumber}
              id="phonenumber"
              name="phonenumber"
              onChange={this.handleChange}
            />
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button color="primary" onClick={this.handleSubmit}>
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
}

ShowContact.propTypes = {
  contact: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleEdit: PropTypes.func,
};

export default ShowContact;
