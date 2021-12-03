import PropTypes from 'prop-types';
import React from 'react';
import s from './ImageGallery.module.css';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  onOpenModal,
}) {
  return (
    <li className={s.imageGalleryItem}>
      <img
        src={webformatURL}
        alt="Pic from Pixabay"
        className={s.imageGalleryItem__image}
        onClick={() => onOpenModal({ largeImageURL })}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
