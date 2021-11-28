import { Component } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>🐌</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
