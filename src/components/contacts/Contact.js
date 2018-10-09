import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Consumer } from '../../context';

class Contact extends Component {


  state = {
    showContactInfo: false
  };

  onShowClick = () => {
    this.setState({ showContactInfo: !this.state.showContactInfo })
  }

  onDeleteClick = (id, dispatch) => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  }

  render() {
    const { id, name, email, phone } = this.props;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              <h4> {name} <i onClick={this.onShowClick} className="fa fa-sort-desc" aria-hidden="true"></i></h4> <i className="fa fa-times" aria-hidden="true" onClick={() => { this.onDeleteClick(id, dispatch) }}></i>
              {this.state.showContactInfo ? <ul>
                <li> {email} </li>
                <li> {phone} </li>
              </ul> : null}
            </div>
          )
        }}
      </Consumer>
    )
  }
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
}

export default Contact;

// pass callback function while performing setstate
// add pointers

