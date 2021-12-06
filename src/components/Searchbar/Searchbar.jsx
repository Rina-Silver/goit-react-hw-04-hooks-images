import { Component } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends Component {
  state = {
    value: '',
  };
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleValueChange = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    if (value.trim() === '') {
      // console.log('Не введено значение');
      return toast.error('Не введено значение', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    this.props.onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>🐌</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            placeholder="Search images and photos"
            value={this.state.value}
            autoComplete="off"
            autoFocus
            onChange={this.handleValueChange}
          />
        </form>
      </header>
    );
  }
}
