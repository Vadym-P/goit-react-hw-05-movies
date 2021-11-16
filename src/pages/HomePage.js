import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WrapperContainer from '../components/WrapperContainer';
import PageTitle from '../components/PageTitle';
import * as movieAPI from '../services/moviedb-API';
import s from './StylesPages/HomePage.module.css';
import defaultImg from '../defaultImage/default.png';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    movieAPI.fetchTrendMovies().then(setMovies);
  }, []);

  return (
    <WrapperContainer>
      <PageTitle text="Trending today" />

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
