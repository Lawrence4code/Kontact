import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import { fire } from '../../fire';

const database = fire.database();

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onShowClick = () => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  onDeleteClick = (id, dispatch) => {
    database
      .ref(`/contactRecords/${id}`)
      .remove()
      .then(() => {
        dispatch({ type: 'DELETE_CONTACT', payload: id });
      });
  };

  render() {
    const { id, name, email, phone } = this.props;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="contactList__items">
              <h3>{name}</h3>
              <div>
                <i
                  onClick={this.onShowClick}
                  className="fa fa-sort-desc"
                  aria-hidden="true"
                />

                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  onClick={() => {
                    this.onDeleteClick(id, dispatch);
                  }}
                />
              </div>
              {this.state.showContactInfo ? (
                <ul className="contactList__contactInfo">
                  <li> Email: {email} </li>
                  <li> Phone: {phone} </li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};

export default Contact;

// pass callback function while performing setstate
// add pointers
