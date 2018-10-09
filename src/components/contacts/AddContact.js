import React, { Component } from 'react';
import { Consumer } from '../../context'
import uuid from 'uuid';
import FormInputGroup from '../layout/formInputGroup';

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
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormSubmit = (e, dispatch) => {
    // console.log('onFormSubmit triggered.');
    e.preventDefault();
    const { name, email, phone, errors } = this.state;
    const newContact = {
      id: uuid(),
      name,
      email,
      phone
    }

    if (name === '') {
      this.setState(() => {
        return {
          errors: {
            name: 'Name is required'
          }
        }
      })
      return;
    }

    if (email === '') {
      this.setState(() => {
        return {
          errors: {
            email: 'Email is required'
          }
        }
      })
      return;
    }

    if (phone === '') {
      this.setState(() => {
        return {
          errors: {
            phone: 'Phone is required'
          }
        }
      })
      return;
    }





    dispatch({ type: 'ADD_CONTACT', payload: newContact })

    this.setState({
      name: '',
      email: '',
      phone: '',
      photo: '',
      // errors: {}

    })
  }

  render() {
    const { name, email, phone, photo, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              <h2> Add Contact </h2>
              <form onSubmit={(e) => this.onFormSubmit(e, dispatch)}>
                <FormInputGroup label='Name:' type="text" placeholder='Name' name='name' value={name} onChange={(e) => this.onInputChange(e)} error={errors.name} />

                <FormInputGroup label='Email:' type="email" placeholder='Enter email here.' name='email' value={email} onChange={(e) => this.onInputChange(e)} error={errors.email} />

                <FormInputGroup label='Phone Number:' type="number" placeholder='Enter phone no. here.' name='phone' value={phone} onChange={(e) => this.onInputChange(e)} error={errors.phone} />

                <FormInputGroup label='Contact Photo:' type="file" name='photo' value={photo} onChange={(e) => this.onInputChange(e)} />
                <input type="submit" value='Add Contact' />
              </form>

            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default AddContact;

