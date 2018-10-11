import React, { Component, Fragment } from 'react';

import Contact from './Contact';
import { Consumer } from '../../context';

class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <Fragment>
              <h2 className="contactList__title"> Contact List </h2>
              <div className="contactList">
                {contacts.map(contact => (
                  <Contact key={contact.id} {...contact} />
                ))}
              </div>
            </Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
