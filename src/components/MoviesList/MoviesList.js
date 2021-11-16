import { Link } from 'react-router-dom';
// import { useEffect } from 'react';
import s from './Movies.list.module.css';

export default function MoviesList({ movies }) {
  //   const location = useLocation();

  //   const navigate = useNavigate();

  // useEffect(() => {
  //   navigate({ state: { search:  } });
  // }, [navigate]);

  return (
    <ul className={s.list}>
      {movies &&
        movies.map(({ id, title, backdrop_path, original_title, name }) => (
          <li key={id} className={s.item}>
            <Link to={`/movies/${id}`}>
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
