import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';
//rfc
export default function ImageGallery({ images, onOpenModal }) {
  //console.log(images);
  return (
    <div>
      <ul className={s.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            id={id}
            src={webformatURL}
            srcLarge={largeImageURL}
            onOpenModal={onOpenModal}
          />
        ))}
      </ul>
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      srcLarge: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
