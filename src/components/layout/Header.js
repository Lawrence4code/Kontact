import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { branding } = props;
  return (
    <div>
      <h1> {branding} </h1>
      <div>
        <ul>
          <li> <Link to='/'> Home</Link>  </li>
          <li> <Link to='/contact/add'> Add Contact </Link>  </li>
          <li> <Link to='/about'> About</Link> </li>
        </ul>
      </div>
    </div>
  )
}

Header.propTypes = {
  branding: PropTypes.string.isRequired
}

export default Header;