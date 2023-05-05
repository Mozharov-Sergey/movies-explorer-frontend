import { useState, useCallback } from 'react';
import { isEmail } from 'validator';

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const [emailErrorShown, setEmailErrorShown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    setErrors({ ...errors, [name]: e.target.validationMessage });

    setIsValid(e.target.closest('form').checkValidity());

    if (e.target.name === 'email') {
      setErrors({ ...errors, ['email']: isEmail(value) ? '' : 'Invalid email' });
      setIsValid(isEmail(value) && e.target.closest('form').checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}
