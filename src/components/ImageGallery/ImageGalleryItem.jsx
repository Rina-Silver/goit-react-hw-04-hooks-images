import PropTypes from 'prop-types';
import React from 'react';
import s from './ImageGallery.module.css';

export default function ImageGalleryItem({ id, src, srcLarge, onOpenModal }) {
  return (
    <li
      className={s.imageGalleryItem}
      key={id}
      onClick={() => onOpenModal({ srcLarge })}
    >
      <img
        src={src}
        alt="Pic from Pixabay"
        className={s.imageGalleryItem__image}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  srcLarge: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
