import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Buttons.scss';

const Button = ({
  children,
  className,
  disabled,
  type,
  onClick,
  ...restOfProps
}) => {
  const buttonClassNames = cx('button', {
    'button--disabled': disabled,
    [className]: className,
  });
  return (
    <button
      className={buttonClassNames}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...restOfProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  onClick: PropTypes.func,
};

export default Button;
