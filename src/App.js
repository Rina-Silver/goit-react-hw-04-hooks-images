import React, { Component } from 'react';
import s from './App.module.css';
import Searchbar from 'components/Searchbar';

//rcc
class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    showModal: false,
    showSpinner: false,
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar />
      </div>
    );
  }
}
export default App;

//  <ImageGallery />
//         <Loader />
//         <Button />
//         <Modal />
