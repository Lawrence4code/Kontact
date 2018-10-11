import React, { Component } from 'react';
import database from './fire';
const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      console.log('DELETE CONTACT TRIGGERED.');
      console.log(action.payload);

      // database.ref(`/contactRecords/${action.payload}`).remove();
      return {
        ...state,
        contacts: state.contacts.filter(contact => {
          return contact.id !== action.payload;
        })
      };

    case 'ADD_CONTACT':
      console.log('ADD CONTACT TRIGGERED.');
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };

    default:
      console.log('DEFAULT TRIGGERED.');
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [
      // { id: '1', name: 'John Doe', email: 'Johndoe@gmail.com', phone: '555-555-5555' },
      // { id: '2', name: 'Jane Gmail', email: 'Janed@gmail.com', phone: '555-111-1111' },
      // { id: '3', name: 'Peter Kaccoon', email: 'Pete@gmail.com', phone: '555 -333-4444' },
    ],
    dispatch: action => {
      this.setState(state => {
        // console.log(reducer(state, action));
        return reducer(state, action);
      });
    }
  };

  componentDidMount() {
    database.ref('/contactRecords').on('value', snapshot => {
      const data = snapshot.val() || {};
      const contactRecordsFromFirebase = [];

      for (const id in data) {
        const contacts = data[id];
        contactRecordsFromFirebase.push({ ...contacts, id });
        this.setState({
          contacts: contactRecordsFromFirebase
        });
      }
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
