export const getVisibleErrors = (errors, touchedFields) =>
  Object.keys(errors).reduce(
    (acc, cur) => (touchedFields[cur] ? { ...acc, [cur]: errors[cur] } : acc),
    {},
  );

export const touchAllValues = (values) =>
  Object.keys(values).reduce((acc, cur) => ({ ...acc, [cur]: true }), {});

export const validateNip = (nip) => {
  if (!nip.match(/^[0-9]{10}$/)) {
    return false;
  }
  const nipWeights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  return isCorrectNipControlSum(nip, nipWeights);
};

const isCorrectNipControlSum = (nip, weights) => {
  const sum = weights.reduce((acc, cur, i) => acc + parseInt(nip[i]) * cur, 0);

  if (sum === 0) {
    return false;
  }

  const controlSum = sum % 11 === 10 ? 0 : sum % 11;
  return controlSum === parseInt(nip[weights.length]);
};

export const validatePesel = (pesel) => {
  if (!pesel.match(/^[0-9]{11}$/)) {
    return false;
  }

  const month = parseInt(pesel.substring(2, 4));
  if (!month || month % 20 > 12) {
    return false;
  }

  const day = parseInt(pesel.substring(4, 6));
  if (!day || day < 1 || day > 31) {
    return false;
  }

  const peselWeights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  return isCorrectPeselControlSum(pesel, peselWeights);
};

const isCorrectPeselControlSum = (pesel, weights) => {
  const sum = weights.reduce((acc, cur, i) => {
    const currentValue = parseInt(pesel[i]) * cur;
    return acc + (currentValue % 10);
  }, 0);

  if (sum === 0) {
    return false;
  }

  const controlSum = 10 - (sum % 10);
  return controlSum === parseInt(pesel[weights.length]);
};
