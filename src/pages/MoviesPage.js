import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WrapperContainer from '../components/WrapperContainer';
import Searchbar from '../components/Searchbar';
import MoviesList from '../components/MoviesList';
import * as movieAPI from '../services/moviedb-API';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

export default function MoviesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  const getNewQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!getNewQuery) {
      return;
    }
    setStatus('pending');
    movieAPI
      .fetchSearchMovies(getNewQuery)
      .then(({ results }) => setMovies(results));
    setStatus('resolved');
  }, [getNewQuery]);

  const handleSearchbarSubmit = searchQuery => {
    navigate({ search: `?query=${searchQuery}`, state: { from: location } });
  };

  return (
    <WrapperContainer>
      <Searchbar onHandleSubmit={handleSearchbarSubmit} />

      {status === 'pending' && <Loader />}

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
