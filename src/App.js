import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppBar from './components/AppBar';
import Container from './components/Container';
import Loader from './components/Loader';
// import HomePage from './pages/HomePage';
// import MoviesPage from './pages/MoviesPage';
// import MovieDetailsPage from './pages/MovieDetailsPage';
// import Cast from './pages/Cast';
// import Reviews from './pages/Reviews';
// import NotFoundPage from './pages/NotFoundPage';
const HomePage = lazy(() =>
  import('./pages/HomePage.js' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage.js' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage.js' /* webpackChunkName: "movies-details-page" */
  ),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage.js' /* webpackChunkName: "not-found-page" */),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/goit-react-hw-05-movies"
            element={<Navigate to="/" />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
