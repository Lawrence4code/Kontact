import React from 'react';
import PropTypes from 'prop-types';

const FormInputGroup = ({ label, type, name, placeholder, value, onChange, error }) => {
  return (
    <div className="fromInputGroup">
      <label htmlFor={name}> {label} </label>
      <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />
      {error}
    </div>
  )
}

FormInputGroup.prototype = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

FormInputGroup.defaultPropType = {
  type: 'text'
}

export default FormInputGroup;
