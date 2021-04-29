import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const SelectInput = ({
  errorMessage,
  label,
  name,
  value,
  options,
  onChange,
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
    <div className={formControlClassNames}>
      <select name={name} className='formControl__input' onChange={onChange}>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className='formControl__label'>
        <label htmlFor={name}>{label}</label>
      </span>
      <div className='error formControl__errorMessage'>{errorMessage}</div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    }),
  ),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SelectInput;
