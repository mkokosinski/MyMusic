import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PreviewPlaceholder from './PreviewPlaceholder';
import Button from '../../Buttons/Button';
import { getImageSize } from '../../../utils/fileHelpers';
import './FileInput.scss';

const FileInput = ({ errorMessage, name, onChange }) => {
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

  const fieldClassNames = cx('fileField', {
    'fileField--hasError': errorMessage,
  });

  return (
    <>
      <div className={fieldClassNames}>
        <label className='fileField__label' htmlFor={name}>
          <input
            className='fileField__input'
            accept='image/jpeg'
            type='file'
            name={name}
            id={name}
            onChange={handleFileChange}
          />

          <div className='fileField__preview'>
            {previewSrc ? (
              <img src={previewSrc} alt='Uploaded img preview' />
            ) : (
              <PreviewPlaceholder />
            )}
          </div>

          <Button tabIndex='-1' className={`button--light fileField__button`}>
            <span>{previewSrc ? `Zmień zdjęcie` : `Dodaj zdjęcie`}</span>
          </Button>
        </label>
      </div>
      <div className='error formControl__errorMessage fileField__errorMessage'>
        {errorMessage}
      </div>
    </>
  );
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

export default FileInput;
