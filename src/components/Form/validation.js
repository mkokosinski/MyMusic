import { CONTRACTOR_TYPE } from '../../utils/constants';
import { validateNip, validatePesel } from '../../utils/formHelpers';
import { isEmpty } from '../../utils/objectHelpers';

export const contractorValidation = (values) => {
  const { img, name, surname, type, pesel, nip } = values;
  const errors = {};
  if (isEmpty(img)) {
    errors.img = 'Zdjęcie jest wymagane';
  } else if (img.sizes.ratio !== 1) {
    errors.img = `Zdjęcie musi mieć propocje 1:1.\n Wymiary przesłanego zdjęcia: ${img.sizes.width}px x ${img.sizes.height}px`;
  }

  if (!name || !name.trim()) {
    errors.name = 'Imię jest wymagane';
  }

  if (!surname || !surname.trim()) {
    errors.surname = 'Nazwisko jest wymagane';
  }

  if (!type || !type.trim()) {
    errors.type = 'Typ jest wymagany';
  }

  if (type === CONTRACTOR_TYPE.PERSON) {
    if (!pesel || !pesel.trim()) {
      errors.pesel = 'PESEL jest wymagany';
    } else if (!validatePesel(pesel)) {
      errors.pesel = 'Niepoprawny numer PESEL';
    }
  }

  if (type === CONTRACTOR_TYPE.COMPANY) {
    if (!nip || !nip.trim()) {
      errors.nip = 'NIP jest wymagany';
    } else if (!validateNip(nip)) {
      errors.nip = 'Niepoprawny numer NIP';
    }
  }

  return errors;
};
