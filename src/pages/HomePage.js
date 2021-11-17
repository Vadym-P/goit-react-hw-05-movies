import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import WrapperContainer from '../components/WrapperContainer';
import PageTitle from '../components/PageTitle';
import * as movieAPI from '../services/moviedb-API';
import s from './StylesPages/HomePage.module.css';
import defaultImg from '../defaultImage/default.png';
import Loader from '../components/Loader';

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');
    movieAPI.fetchTrendMovies().then(setMovies);
    setStatus('resolved');
  }, []);

  return (
    <WrapperContainer>
      <PageTitle text="Trending today" />

      {status === 'pending' && <Loader />}

      {movies && (
        <ul className={s.list}>
          {movies.results.map(movie => (
            <li key={movie.id} className={s.item}>
              <Link to={`/movies/${movie.id}`}>
                {movie.backdrop_path ? (
                  <img
                    className={s.img}
                    src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                    alt={movie.original_title || movie.name}
                  />
                ) : (
                  <img
                    className={s.defaultImg}
                    src={defaultImg}
                    alt="not_image"
                  />
                )}

                {movie.original_title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </WrapperContainer>
  );
}

HomePage.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      movie: PropTypes.string.isRequired,
    }),
  ),
  status: PropTypes.string,
};
