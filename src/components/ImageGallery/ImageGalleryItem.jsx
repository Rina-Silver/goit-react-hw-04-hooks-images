import PropTypes from 'prop-types';
import React from 'react';
import s from './ImageGallery.module.css';

export default function ImageGalleryItem({ id, src, srcLarge, onOpenModal }) {
  // console.log(srcLarge);
  return (
    <li
      className={s.ImageGalleryItem}
      key={src}
      onClick={() => onOpenModal({ srcLarge })}
    >
      <img
        id={id}
        src={src}
        alt="Pic from Pixabay"
        className={s.ImageGalleryItem__image}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  srcLarge: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
