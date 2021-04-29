export const getImageSize = (imgPath) =>
  new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.src = imgPath;
      img.onload = () => {
        const { height, width } = img;
        const ratio = width / height;
        resolve({
          ratio,
          height,
          width,
        });
      };
    } catch (error) {
      reject(error);
    }
  });
