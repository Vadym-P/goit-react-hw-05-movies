import { useState, useEffect } from 'react';
import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import WrapperContainer from '../components/WrapperContainer';
import * as movieAPI from '../services/moviedb-API';
import s from './StylesPages/MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    movieAPI.fetchMovieId(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    if (location.pathname === `/movies/${movieId}`) {
      navigate(-1);
    }
    if (location.pathname === `/movies/${movieId}/cast`) {
      navigate(-2);
    }
    if (location.pathname === `/movies/${movieId}/reviews`) {
      navigate(-2);
    }
  };

  return (
    <WrapperContainer>
      <button type="button" className={s.btn} onClick={onGoBack}>
        Go back
      </button>
      {movie && (
        <div className={s.infoContainer}>
          <img
            className={s.img}
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.original_title || movie.name}
          />
          <div className={s.descContainer}>
            <h2>{movie.original_title || movie.name}</h2>
            <p>Average rating: {movie.vote_average}</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <div className={s.genre}>
              {movie.genres.map(genre => (
                <span key={genre.id} className={s.genreTitle}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      <hr />
      <div>
        <span className={s.textWrap}>Additional information</span>
        <ul className={s.list}>
          <li className={s.itemLink}>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li className={s.itemLink}>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </div>
      <hr />

      <Outlet />
    </WrapperContainer>
  );
}
