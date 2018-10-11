import React, { Component, Fragment } from 'react';
import { Consumer } from '../../context';
import uuid from 'uuid';
import FormInputGroup from '../layout/formInputGroup';
import { fire } from '../../fire';

const database = fire.database();

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    photo: '',
    errors: {
      name: '',
      error: '',
      phone: ''
    }
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = (e, dispatch) => {
    // console.log('onFormSubmit triggered.');
    e.preventDefault();
    const { name, email, phone } = this.state;
    const newContact = {
      id: uuid(),
      name,
      email,
      phone
    };

    if (name === '') {
      this.setState(() => {
        return {
          errors: {
            name: 'Name is required'
          }
        };
      });
      return;
    }

    if (email === '') {
      this.setState(() => {
        return {
          errors: {
            email: 'Email is required'
          }
        };
      });
      return;
    }

    if (phone === '') {
      this.setState(() => {
        return {
          errors: {
            phone: 'Phone is required'
          }
        };
      });
      return;
    }

    dispatch({ type: 'ADD_CONTACT', payload: newContact });

    database
      .ref('/contactRecords')
      .push()
      .set({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone
      });

    this.setState({
      name: '',
      email: '',
      phone: '',
      photo: ''
      // errors: {}
    });

    this.props.history.push('/');
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <Fragment>
              <h2 className="addContact__title"> Add Contact </h2>
              <div className="addContact">
                <form onSubmit={e => this.onFormSubmit(e, dispatch)}>
                  <h3> Enter contact details.</h3>
                  <FormInputGroup
                    label="Name :"
                    type="text"
                    placeholder="Enter name here."
                    name="name"
                    value={name}
                    onChange={e => this.onInputChange(e)}
                    error={errors.name}
                  />

                  <FormInputGroup
                    label="Email :"
                    type="email"
                    placeholder="Enter email here."
                    name="email"
                    value={email}
                    onChange={e => this.onInputChange(e)}
                    error={errors.email}
                  />

                  <FormInputGroup
                    label="Phone Number :"
                    type="number"
                    placeholder="Enter phone no here."
                    name="phone"
                    value={phone}
                    onChange={e => this.onInputChange(e)}
                    error={errors.phone}
                  />

                  <input
                    className="addContact__button "
                    type="submit"
                    value="Add Contact"
                  />
                </form>
              </div>
            </Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;

// <FormInputGroup
//   label="Contact Photo:"
//   type="file"
//   name="photo"
//   value={photo}
//   onChange={e => this.onInputChange(e)}
// />
