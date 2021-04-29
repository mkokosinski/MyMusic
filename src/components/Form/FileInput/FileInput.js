import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FileInput.scss';
import Button from '../../Buttons/Button';
import { getImageSize } from '../../../utils/fileHelpers';

const FileInput = ({ name, value, onChange }) => {
  const [previewSrc, setPreviewSrc] = useState(null);

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      const imgPath = URL.createObjectURL(file);
      setPreviewSrc(imgPath);
      const sizes = await getImageSize(imgPath);
      onChange({
        target: {
          name,
          value: {
            file,
            path: imgPath,
            sizes,
          },
        },
      });
    } catch (error) {
      console.error('Image upload error', error);
    }
  };

  return (
    <div className='fileField'>
      <label className='fileField__label' htmlFor={name}>
        <input
          className='fileField__input'
          accept='image/jpeg'
          type='file'
          name={name}
          id={name}
          //   value={values.img.path}
          onChange={handleFileChange}
        />

        <div className='fileField__preview'>
          {previewSrc && <img src={previewSrc} alt='Uploaded img preview' />}
        </div>

        <Button tabIndex='-1' className={`button--light fileField__button`}>
          <span className='file-icon'>
            <i className='fas fa-upload'></i>
          </span>
          <span>{previewSrc ? `Zmień zdjęcie` : `Dodaj zdjęcie`}</span>
        </Button>
      </label>
    </div>
  );
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FileInput;
