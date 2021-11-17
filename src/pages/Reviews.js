import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/moviedb-API';
import s from './StylesPages/Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    movieAPI.fetchMovieIdReviews(movieId).then(setReviews);
  }, [movieId]);

  return (
    <>
      <div className={s.container}>
        {reviews && reviews.total_results !== 0 ? (
          <ul className={s.list}>
            {reviews.results.map(review => (
              <li key={review.id} className={s.item}>
                <span className={s.author}>Author: {review.author}</span>
                <p className={s.content}>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={s.text}>We don't have any reviews for this movie.</p>
        )}
      </div>
    </>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.number,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      reviews: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          author: PropTypes.string.isRequired,
          content: PropTypes.string,
        }),
      ),
    }),
  ),
};
