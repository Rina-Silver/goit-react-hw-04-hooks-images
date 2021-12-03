import React, { Component } from 'react';
import s from './App.module.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
// import Loader from 'components/Loader';
// import Button from 'components/Button';
// import Modal from 'components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//rcc
export default class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    showModal: false,
    showSpinner: false,
    largeImageURL: '',
  };
  changeInputValue = query => {
    this.setState({
      query,
      page: 1,
      images: [],
    });
  };

  render() {
    const { images, query, showModal, showSpinner, largeImageURL } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.changeInputValue} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        {images.length !== 0 ? (
          <ImageGallery images={images} onOpenModal={this.onClickLargeImage} />
        ) : (
          query !== '' &&
          toast.warn('Ничего не найдено', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        )}
      </div>
    );
  }
}
