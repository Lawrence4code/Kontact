import React, { Component, Fragment } from 'react';
import { Consumer } from '../../context';
import uuid from 'uuid';
import FormInputGroup from '../layout/formInputGroup';
import database from '../../fire';

class AddContact extends Component {
  state = {
    firstName: '',
    lastName: '',
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
    const { firstName, lastName, email, phone } = this.state;
    const newContact = {
      id: uuid(),
      firstName,
      lastName,
      email,
      phone
    };

    if (firstName === '') {
      this.setState(() => {
        return {
          errors: {
            firstName: 'First Name is required'
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
        return { errors: { phone: 'Phone is required' } };
      });

      return;
    } else if (phone.length < 9) {
      this.setState(() => {
        return { errors: { phone: 'Phone must of atleast 9 digits.' } };
      });
      return;
    } else if (phone.length > 10) {
      this.setState(() => {
        return { errors: { phone: 'Phone must of less 10 digits.' } };
      });
      return;
    }

    dispatch({ type: 'ADD_CONTACT', payload: newContact });

    // function for capitalize first letter of the name
    const capitalize = str => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // function for formatting for phone number

    const formatPhoneNumber = phoneNumberString => {
      const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
      const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        var intlCode = match[1] ? '+1 ' : '';
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
          ''
        );
      }
      return null;
    };

    database
      .ref('/contactRecords')
      .push()
      .set({
        firstName: capitalize(this.state.firstName).trim(),
        lastName: capitalize(this.state.lastName).trim(),
        email: this.state.email.trim(),
        phone: formatPhoneNumber(this.state.phone.trim())
      });

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      photo: ''
      // errors: {}
    });

    this.props.history.push('/');
  };

  render() {
    const { firstName, lastName, email, phone, errors } = this.state;

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
                    label="First Name :"
                    type="text"
                    placeholder="Enter first name here."
                    name="firstName"
                    value={firstName}
                    onChange={e => this.onInputChange(e)}
                    error={errors.firstName}
                  />

                  <FormInputGroup
                    label="Last Name :"
                    type="text"
                    placeholder="Enter last name here."
                    name="lastName"
                    value={lastName}
                    onChange={e => this.onInputChange(e)}
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
