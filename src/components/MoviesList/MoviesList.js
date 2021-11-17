import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import s from './Movies.list.module.css';

export default function MoviesList({ movies }) {
  const location = useLocation();
  return (
    <ul className={s.list}>
      {movies &&
        movies.map(({ id, title, backdrop_path, original_title, name }) => (
          <li key={id} className={s.item}>
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: { from: location },
              }}
            >
              <img
                className={s.img}
                src={`https://image.tmdb.org/t/p/w300${backdrop_path}`}
                alt={original_title || name}
              />
              {title}
            </Link>
          </li>
        ))}
    </ul>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      backdrop_path: PropTypes.string,
      original_title: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};
