import React, { Component } from 'react';
import s from './App.module.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
// import Button from 'components/Button';
// import Modal from 'components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mapper } from './helper/mapper';

const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12';
const API_KEY = '23479775-7c8a7e565023089f3ce2cecd2';

//rcc
export default class App extends Component {
  state = {
    images: null,
    query: '',
    page: 1,
    showModal: false,
    showSpinner: false,
    largeImageURL: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      return this.getImages();
    } else {
      return toast.warn(`Ничего не найдено`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  changeInputValue = query => {
    this.setState({
      query,
      page: 1,
      images: [],
    });
  };

  getImages = () => {
    const { query, page, error } = this.state;

    this.setState({ showSpinner: true });

    fetch(`${BASE_URL}&q=${query}&page=${page}&key=${API_KEY}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Что-то пошло не так`));
      })
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...mapper(images.hits)],
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ showSpinner: false }));
  };

  render() {
    const { images, query, showModal, showSpinner, largeImageURL, error } =
      this.state;
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

        {images && (
          <ImageGallery images={images} onOpenModal={this.onClickLargeImage} />
        )}

        {showSpinner && <Loader />}

        {error &&
          toast.error(`${error.massage}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          })}
      </div>
    );
  }
}
