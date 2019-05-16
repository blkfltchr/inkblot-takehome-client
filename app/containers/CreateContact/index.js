import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

class CreateContact extends Component {
  state = {
    name: '',
    type: '',
    email: '',
    phonenumber: '',
    photo: '',
  };

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
      // await console.log(input);
      await API.graphql(graphqlOperation(mutations.createContact, { input }));
      console.log('New contact successfully added.');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { name, type, email, phonenumber, photo } = this.state;
    return (
      <div>
        <h2>Add a new contact</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={type}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="phonenumber"
            placeholder="Phone number"
            value={phonenumber}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo"
            value={photo}
            onChange={this.handleChange}
          />
          <button type="button" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateContact;
