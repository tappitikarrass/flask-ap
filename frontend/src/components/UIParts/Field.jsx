import React from 'react';
import PropTypes from 'prop-types';

import '../../scss/UI.scss';
import '../../scss/Field.scss';

function Field(props) {
  const {
    id, fieldClass, onSubmit, placeHolder,
  } = props;

  return (
    <input id={id} className={fieldClass} type="text" placeHolder={placeHolder} onSubmit={onSubmit} />
  );
}

Field.defaultProps = {
  fieldClass: 'field-end',
  onSubmit: null,
  id: '',
  placeHolder: 'Input',
};

Field.propTypes = {
  fieldClass: PropTypes.string,
  onSubmit: PropTypes.func,
  id: PropTypes.string,
  placeHolder: PropTypes.string,
};

export default Field;
