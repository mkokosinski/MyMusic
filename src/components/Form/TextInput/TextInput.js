import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const TextInput = ({
  errorMessage,
  label,
  name,
  value,
  onChange,
  ...otherProps
}) => {
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const formControlClassNames = cx('formControl', {
    'formControl--hasValue': hasValue,
    'formControl--hasError': errorMessage,
  });

  return (
    <>
      <div className={formControlClassNames}>
        <input
          className='formControl__input'
          type='text'
          id={name}
          name={name}
          onChange={onChange}
          value={value}
          {...otherProps}
        />
        <span className='formControl__label'>
          <label htmlFor={name}>{label}</label>
        </span>
        <div className='error formControl__errorMessage'>{errorMessage}</div>
      </div>
    </>
  );
};

TextInput.propTypes = {
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default TextInput;
