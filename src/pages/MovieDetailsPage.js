import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  Routes,
  Route,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import WrapperContainer from '../components/WrapperContainer';
import * as movieAPI from '../services/moviedb-API';
import Loader from '../components/Loader';
import s from './StylesPages/MovieDetailsPage.module.css';
const Cast = lazy(() => import('./Cast.js' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('./Reviews.js' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');
    movieAPI.fetchMovieId(movieId).then(setMovie);
    setStatus('resolved');
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
      {status === 'pending' && <Loader />}
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

      <div className={s.container}>
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

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/cast" element={<Cast />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
    </WrapperContainer>
  );
}
