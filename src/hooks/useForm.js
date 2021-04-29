import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const useForm = ({ initialValues, validationSchema, onSubmit }) => {
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({});
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setisSubmitting] = useState(false);

  const validate = useCallback(
    (name, value) => {
      validationSchema
        .validate(values, { abortEarly: false })
        .then(() => {
          setErrors({});
          setIsValid(true);
        })
        .catch((errors) => {
          const { inner } = errors;
          const fieldErrors = inner.reduce((acc, cur) => {
            const { path, message } = cur;
            // return touched[path] ? { ...acc, [path]: message } : { ...acc };
            return { ...acc, [path]: message };
          }, {});

          setErrors(fieldErrors);
        });
    },
    [touched, validationSchema, values]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDirty(true);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      validate();
      if (!isValid) {
        return;
      }

      setisSubmitting(true);
      setDirty(true);
      onSubmit(values);
      setisSubmitting(false);
    } catch (error) {
      setisSubmitting(false);
      console.error(error);
    }
  };

  useEffect(() => {
    validate();
  }, [validate, values]);

  return {
    dirty,
    errors,
    isSubmitting,
    values,
    touched,
    handleChange,
    handleSubmit,
  };
};

useForm.propTypes = {
  initialValues: PropTypes.shape({}),
  validation: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};
