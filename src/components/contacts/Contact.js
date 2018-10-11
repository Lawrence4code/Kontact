import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import database from '../../fire';

import cross from '../../images/cross.svg';
import expand from '../../images/unfold_more.svg';

import '../../images/sprites.svg';

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
    const { id, firstName, lastName, email, phone } = this.props;
    // console.log(id, firstName, lastName, email, phone);

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="contactList__items">
              <h3>
                {firstName} {lastName}
              </h3>
              <div>
                <img
                  src={expand}
                  className="icon--expand"
                  alt="cross-icon"
                  onClick={this.onShowClick}
                />
                <img
                  src={cross}
                  className="icon--cross"
                  alt="cross-icon"
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
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};

export default Contact;

// pass callback function while performing setstate
// add pointers
