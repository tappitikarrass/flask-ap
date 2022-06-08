import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../../scss/UI.scss';
import '../../scss/Field.scss';

function Field(props) {
  const {
    id, fieldClass, onSubmit, placeholder, type,
  } = props;

  const [value, setValue] = useState('');

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <input
      id={id}
      className={fieldClass}
      type={type}
      placeholder={placeholder}
      value={value}
      onSubmit={onSubmit}
      onChange={handleChange}
    />
  );
}

Field.defaultProps = {
  fieldClass: 'field-end',
  onSubmit: null,
  id: '',
  placeholder: 'Input',
  type: 'text',
};

Field.propTypes = {
  fieldClass: PropTypes.string,
  onSubmit: PropTypes.func,
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Field;