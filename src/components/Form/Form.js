import React, { useState } from 'react';
import Button from '../Buttons/Button';
import FileInput from './FileInput/FileInput';
import TextInput from './TextInput/TextInput';
import SelectInput from './SelectInput/SelectInput';
import { useForm } from '../../hooks/useForm';
import { contractorValidation } from './validation';
import { createContractor } from '../../api/MainConnections';
import { contractorTypesOptions, CONTRACTOR_TYPE } from '../../utils/constants';
import './Form.scss';

const initialValues = {
  img: '',
  name: '',
  surname: '',
  type: CONTRACTOR_TYPE.PERSON,
  pesel: '',
  nip: '',
};

const Form = () => {
  const [serverErrors, setServerErrors] = useState(null);

  const onSubmit = async (values) => {
    const { img, nip, pesel, ...restValues } = values;
    const dataToSend = {
      ...restValues,
      img: img.file,
      idNumber: values.type === CONTRACTOR_TYPE.COMPANY ? nip : pesel,
    };
    setServerErrors(null);
    await createContractor(dataToSend).catch((err) => setServerErrors(err));
    console.log('end');
  };

  const {
    errors,
    isSubmitting,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues,
    onSubmit,
    validation: contractorValidation,
  });

  return (
    <form className='form' onSubmit={handleSubmit}>
      <fieldset className='form__fieldset' disabled={isSubmitting}>
        <div className='form__file'>
          <FileInput
            name='img'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.img}
            errorMessage={errors.img}
          />
        </div>

        <div className='form__inputs'>
          <TextInput
            label='Imię'
            name='name'
            type='text'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            errorMessage={errors.name}
          />

          <TextInput
            name='surname'
            label='Nazwisko'
            type='text'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.surname}
            errorMessage={errors.surname}
          />

          <SelectInput
            name='type'
            label='Typ'
            options={contractorTypesOptions}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.type}
            errorMessage={errors.type}
          />

          {values.type === 'person' ? (
            <TextInput
              id='pesel'
              name='pesel'
              label='PESEL'
              type='text'
              maxLength='11'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.pesel}
              errorMessage={errors.pesel}
            />
          ) : (
            <TextInput
              id='nip'
              name='nip'
              label='Numer NIP'
              type='text'
              maxLength='10'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nip}
              errorMessage={errors.nip}
            />
          )}
        </div>
      </fieldset>
      <Button
        className='button--submit form__button'
        type='submit'
        disabled={isSubmitting}
      >
        Wyślij
        {isSubmitting && (
          <span class='form__spinner material-icons-outlined'>sync</span>
        )}
      </Button>

      {serverErrors && (
        <div className='error form__errorMessage '>{serverErrors}</div>
      )}
    </form>
  );
};

export default Form;
