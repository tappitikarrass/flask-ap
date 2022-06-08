import React from 'react';
import PropTypes from 'prop-types';

import '../../scss/button.scss';

class Button extends React.PureComponent {
  render() {
    const {
      id, buttonClass, onClick, value,
    } = this.props;

    return (
      <button id={id} type="submit" className={buttonClass} onClick={onClick}>
        {value}
      </button>
    );
  }
}

Button.defaultProps = {
  buttonClass: 'bt-blue-end',
  onClick: null,
  id: '',
  value: 'Button',
};

Button.propTypes = {
  buttonClass: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.string,
};

export default Button;
