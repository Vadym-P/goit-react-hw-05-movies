import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import WrapperContainer from '../components/WrapperContainer';
import * as movieAPI from '../services/moviedb-API';
import defaultImage from '../defaultImage/defaultIcon.jpg';
import s from './StylesPages/Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    movieAPI.fetchMovieIdCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <WrapperContainer>
      <div className={s.container}>
        {cast && (
          <ul className={s.list}>
            {cast.cast.map(actor => (
              <li key={actor.id} className={s.item}>
                {actor.profile_path ? (
                  <img
                    className={s.img}
                    src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                    alt={actor.name || actor.original_name}
                  />
                ) : (
                  <img
                    className={s.img}
                    src={defaultImage}
                    alt={actor.name || actor.original_name}
                  />
                )}
                <div className={s.descContainer}>
                  <p className={s.descName}>
                    {actor.name || actor.original_name}
                  </p>
                  <p className={s.descChar}>Character: {actor.character}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </WrapperContainer>
  );
}

Cast.propTypes = {
  movieId: PropTypes.number,
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      actor: PropTypes.string.isRequired,
    }),
  ),
};
