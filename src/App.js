import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Contacts from './components/contacts/Contacts'
import AboutUs from './components/pages/about';
import Header from './components/layout/Header';
import AddContact from './components/contacts/AddContact';

import { Provider } from './context'

const App = () => {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Header branding="Contact360" />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Contacts} />
              <Route path='/addContacts' component={AddContact} />
              <Route path='/about' component={AboutUs} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App;