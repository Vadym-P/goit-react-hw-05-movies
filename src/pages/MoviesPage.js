import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WrapperContainer from '../components/WrapperContainer';
import Searchbar from '../components/Searchbar';
import MoviesList from '../components/MoviesList';
import * as movieAPI from '../services/moviedb-API';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MoviesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  // const [query, setQuery] = useState('');

  const getNewQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!getNewQuery) {
      return;
    }
    movieAPI
      .fetchSearchMovies(getNewQuery)
      .then(({ results }) => setMovies(results));
  }, [getNewQuery]);

  const handleSearchbarSubmit = searchQuery => {
    // setQuery(searchQuery);
    // setMovies([]);

    navigate({ search: `?query=${searchQuery}`, from: location });
  };

  return (
    <WrapperContainer>
      <Searchbar onHandleSubmit={handleSearchbarSubmit} />

      {movies && <MoviesList movies={movies} />}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </WrapperContainer>
  );
}
