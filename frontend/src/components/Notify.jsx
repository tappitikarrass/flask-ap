import React from 'react';
import PropTypes from 'prop-types';
import '../scss/Notify.scss';

function Notify({
  id, type, title, msg,
}) {
  return (
    <div id={id} className={`notify-${type}`}>
      <div className="notify-text">
        <h3 className="notify-title">{title}</h3>
        <p className="notify-description">
          {msg}
        </p>
      </div>
    </div>
  );
}

const NotifyType = {
  msg: 'msg',
  warn: 'warn',
  error: 'error',
};

Notify.propTypes = {
  type: PropTypes.oneOf(Object.keys(NotifyType)),
  title: PropTypes.string,
  id: PropTypes.string,
  msg: PropTypes.string,
};

Notify.defaultProps = {
  type: 'msg',
  title: 'Title',
  msg: 'message',
  id: 'notification',
};

export default Notify;
