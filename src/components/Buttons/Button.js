import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Buttons.scss';

const Button = ({ children, className, type, onCLick, ...restOfProps }) => {
  const buttonClassNames = cx('button', { [className]: className });
  return (
    <button
      className={buttonClassNames}
      type={type}
      onClick={onCLick}
      {...restOfProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  onCLick: PropTypes.func,
};

export default Button;
