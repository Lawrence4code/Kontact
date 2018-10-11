import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => {
  const { branding } = props;
  return (
    <div className="navigation">
      <div className="navigation__logo">
        <h1> {branding} </h1>
      </div>
      <div className="navigation__menu">
        <ul>
          <li>
            <Link className="navigation__items" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navigation__items" to="/contact/add">
              Add Contact
            </Link>
          </li>
          <li>
            <Link className="navigation__items" to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;
