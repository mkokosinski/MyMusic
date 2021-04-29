const baseUrl = 'https://localhost:60001/';

const post = (url, body) =>
  new Promise((resolve, reject) => {
    try {
      const formData = new FormData();
      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });

      fetch(url, {
        method: 'POST',
        headers: {},
        body: formData,
      })
        .then((res) => {
          res.json();
        })
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          reject('Nie znaleziono metody zapisu');
        });
    } catch (error) {
      reject(error);
    }
  });

export const createContractor = (data) => {
  const endpoint = 'Contractor/Save';
  return post(`${baseUrl}${endpoint}`, data);
};
