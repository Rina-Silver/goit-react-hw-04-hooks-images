import React, { Component } from 'react';
import s from './App.module.css';
import Searchbar from 'components/Searchbar';
// import ImageGallery from 'components/ImageGallery';
// import Loader from 'components/Loader';
// import Button from 'components/Button';
// import Modal from 'components/Modal';
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
    const { images, showModal, showSpinner, largeImageURL } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.changeInputValue} />
      </div>
    );
  }
}
