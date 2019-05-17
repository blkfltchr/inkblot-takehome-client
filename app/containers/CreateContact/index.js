import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { API, graphqlOperation } from 'aws-amplify';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { withRouter } from 'react-router';
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
class CreateContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      email: '',
      phonenumber: '',
      photo: '',
      labelWidth: 0,
    };
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async () => {
    const { name, type, email, phonenumber, photo } = this.state;
    try {
      const input = {
        name,
        type,
        email,
        phonenumber,
        photo,
      };
      this.setState({
        name: '',
        type: '',
        email: '',
        phonenumber: '',
        photo: '',
      });
      await API.graphql(graphqlOperation(mutations.createContact, { input }));
      console.log('New contact successfully added.');
      this.props.history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { name, type, email, phonenumber, photo } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <h2>Add a new contact</h2>
        <form onSubmit={this.handleSubmit} className={classes.root}>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-name"
              label="Name"
              name="name"
              value={name}
              onChange={this.handleChange}
              variant="outlined"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
              variant="outlined"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="phonenumber"
              label="Phone number"
              name="phonenumber"
              value={phonenumber}
              onChange={this.handleChange}
              variant="outlined"
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={node => {
                this.InputLabelRef = node;
              }}
              htmlFor="outlined-relationship-simple"
            >
              Relationship
            </InputLabel>
            <Select
              value={type}
              onChange={this.handleChange}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="type"
                  id="outlined-relationship-simple"
                />
              }
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
              onChange={this.handleChange}
              variant="outlined"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              type="button"
              onClick={this.handleSubmit}
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
}

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CreateContact));
