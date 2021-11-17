import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onHandleSubmit }) {
  const [query, setQuery] = useState('');

  const handleNameChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.info('Введите название фильма!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    onHandleSubmit(query);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        className={s.searchForm__input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={query}
        onChange={handleNameChange}
      />
      <button type="submit" className={s.searchForm__button}>
        <span className={s.searchForm__button_label}>Search</span>
      </button>
    </form>
  );
}

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  query: PropTypes.string,
};
