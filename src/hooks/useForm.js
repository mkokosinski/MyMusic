import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getVisibleErrors, touchAllValues } from '../utils/formHelpers';
import { isEmpty } from '../utils/objectHelpers';

export const useForm = ({ initialValues, validation, onSubmit }) => {
  const [visibleErrors, setVisibleErrors] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({});
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setisSubmitting] = useState(false);

  const validate = useCallback(() => {
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (isEmpty(validationErrors)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [validation, values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setTouched(touchAllValues(values));
      if (!isValid || isSubmitting) {
        return;
      }
      setisSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error(error);
    } finally {
      setisSubmitting(false);
    }
  };

  useEffect(() => {
    validate();
  }, [validate]);

  useEffect(() => {
    setVisibleErrors(getVisibleErrors(errors, touched));
  }, [errors, touched]);

  return {
    errors: visibleErrors,
    isSubmitting,
    isValid,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  };
};

useForm.propTypes = {
  initialValues: PropTypes.shape({}),
  validation: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};
