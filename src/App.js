import { Routes, Route, Navigate } from 'react-router-dom';
import AppBar from './components/AppBar';
import Container from './components/Container';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Cast from './pages/Cast';
import Reviews from './pages/Reviews';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Container>
      <AppBar />

      <Routes>
        <Route path="/goit-react-hw-05-movies" element={<Navigate to="/" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
  );
}
