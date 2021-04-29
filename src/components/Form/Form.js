import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Button from '../Buttons/Button';
import FileInput from './FileInput/FileInput';
import TextInput from './TextInput/TextInput';
import SelectInput from './SelectInput/SelectInput';
import { useForm } from '../../hooks/useForm';
import { createContractor } from '../../api/MainConnections';
import './Form.scss';
/*
Proszę napisać w React formularz dodawania kontrahenta który zawiera:
- Imię
- Nazwisko
- Typ (Osoba lub Firma)
- Numer identyfikacyjny (jeśli osoba to Pesel lub jeśli firma to NIP)
- Zdjęcie (Podgląd ma się wyświetlić po wybraniu pliku z dysku)

Formularz ma walidować dane
Numeru Identyfikacyjnego:
- Czy wprowadzono poprawny PESEL / NIP

Zdjęcie:
- Format JPG/JPEG
- Aspect ratio 1:1 (zdjęcie w kwadracie)
*/

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Wymagane'),
  surname: Yup.string().required(),
  type: Yup.string().required(),
  pesel: Yup.string().when('type', {
    is: (val) => val === 'person',
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
  nip: Yup.string().when('type', {
    is: (val) => val === 'company',
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
});

const initialValues = {
  name: '',
  surname: '',
  type: '',
  pesel: '',
  nip: '',
};

const Form = (props) => {
  const [serverErrors, setServerErrors] = useState(null);

  const onSubmit = (values) => {
    const { img } = values;
    const dataToSend = {
      ...values,
      img: img.file,
    };
    createContractor(dataToSend).catch((err) => setServerErrors(err));
  };

  const { errors, values, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <form className='form' onSubmit={handleSubmit}>
      <TextInput
        className='form__input'
        label='Imię'
        name='name'
        type='text'
        onChange={handleChange}
        value={values.name}
        errorMessage={errors.name}
      />

      <TextInput
        className='form__input'
        name='surname'
        label='Nazwisko'
        type='text'
        onChange={handleChange}
        value={values.surname}
        errorMessage={errors.surname}
      />

      <SelectInput
        className='form__input'
        name='type'
        label='Typ'
        options={[
          { label: 'Osoba', value: 'person' },
          { label: 'Firma', value: 'company' },
        ]}
        onChange={handleChange}
        value={values.type}
        errorMessage={errors.type}
      />

      {values.type === 'person' ? (
        <TextInput
          className='form__input'
          id='pesel'
          name='pesel'
          label='PESEL'
          type='text'
          onChange={handleChange}
          value={values.pesel}
          errorMessage={errors.pesel}
        />
      ) : (
        <TextInput
          className='form__input'
          id='nip'
          name='nip'
          label='Numer NIP'
          type='text'
          onChange={handleChange}
          value={values.nip}
          errorMessage={errors.nip}
        />
      )}

      <FileInput
        name='img'
        onChange={handleChange}
        value={values.file}
        errorMessage={errors.nip}
      />

      <Button className='button--submit' type='submit'>
        Wyślij
      </Button>
      {serverErrors && <div className='errorMessage'>{serverErrors}</div>}
    </form>
  );
};

Form.propTypes = {};

export default Form;
