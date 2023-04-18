import React from 'react';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import authApi from '../../utils/Auth';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Infotooltip from '../InfoTooltip/InfoTooltip';
import moviesApi from '../../utils/MoviesApi.js';
import { CurrentUserContext } from '../../contexts/currentUserContext';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpened, setIsMenuOpened] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [tooltipMessage, setTooltipMessage] = React.useState('');
  const [tooltipStatusAcepted, setTooltipStatusAcepted] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const locations = ['/', '/movies', '/saved-movies', '/profile'];

  //SavedMovies
  const [savedMovies, setSavedMovies] = React.useState({});
  const [savedMoviesTogglerPosition, setSavedMoviesTogglerPosition] = React.useState(true);
  const [savedMoviesLastRequest, setSavedMoviesLastRequest] = React.useState('');

  function handleChangeSavedMoviesTogglerPosition() {
    setSavedMoviesTogglerPosition(!savedMoviesTogglerPosition);
  }

  // Нужно для сохранения информации о пользователе между перезагрузками страницы
  React.useEffect(() => {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    if (currentUser.name !== name && currentUser.email !== email) {
      setCurrentUser({ email, name });
    }
  }, [currentUser]);

  // Сохраняем последнее местоположение
  React.useEffect(() => {
    localStorage.setItem('lastPath', location.pathname);
  }, [location.pathname]);

  // При перезагрузке страницы возвращаем пользователя в последнее местоположение
  React.useEffect(() => {
    tokenCheck();
    const lastPath = localStorage.getItem('lastPath');
    if (lastPath) {
      navigate(lastPath);
    }
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      setIsLoggedIn(true);
    }
  }

  function handleUpdateUserData({ email, name }) {
    authApi
      .updateUserData(email, name)
      .then((res) => {
        localStorage.setItem('userName', res.name);
        localStorage.setItem('userEmail', res.email);
        setCurrentUser({ email: res.email, name: res.name });
        openSucessNotification('Информация о пользователе успешно обновлена');
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(email, password, name) {
    authApi
      .signup(email, password, name)
      .then((res) => {
        if (res) {
          setCurrentUser({ email: email, name: name });
          openSucessNotification('Вы успешно зарегистрированы!');
        }
      })
      .then((res) => {
        handleSignIn(email, password).then((res) => {
          localStorage.setItem('token', res.token);
          setIsLoggedIn(true);
        });
      })
      .catch((err) => {
        openErrorNotification(err.error || err.validation.body.message);
      });
  }

  function openSucessNotification(message) {
    setIsInfoTooltipOpened(true);
    setTooltipStatusAcepted(true);
    setTooltipMessage(message);
  }

  function openErrorNotification(message) {
    setTooltipStatusAcepted(false);
    setIsInfoTooltipOpened(true);
    setTooltipMessage(message);
  }

  function handleSignIn(email, password) {
    return authApi
      .signin(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .then((res) =>
        authApi.getUserData().then((userData) => {
          setCurrentUser(userData);
          localStorage.setItem('userName', userData.name);
          localStorage.setItem('userEmail', userData.email);
        })
      )
      .catch((err) => {
        openErrorNotification(err.validation.body.message || err.error);
      });
  }

  function handleMenuClose() {
    setIsMenuOpened(false);
  }

  function handleMenuOpen() {
    setIsMenuOpened(true);
  }

  function handleCloseInfoTooltip() {
    setIsInfoTooltipOpened(false);
    setTooltipMessage('');
  }

  function handleEmptySearchRequest() {
    setIsInfoTooltipOpened(false);
    setTooltipMessage('Введите поисковый запрос');
    setIsInfoTooltipOpened(true);
  }

  function logOut() {
    // Очищаем стейт переменные
    setIsLoggedIn(false);
    setCurrentUser({});
    setSavedMoviesTogglerPosition(true);
    setSavedMoviesLastRequest('');
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  }

  // получить сохраненные фильмы
  React.useEffect(() => {
    let savedMoviesList = localStorage.getItem('saved_movies');

    if (isLoggedIn && savedMoviesList.length === 2) {
      moviesApi
        .getSavedFilms()
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => console.log(err));
    } else {
      savedMoviesList = JSON.parse(savedMoviesList);
      setSavedMovies(savedMoviesList);
    }
  }, [currentUser]);

  React.useEffect(() => {
    localStorage.setItem('saved_movies', JSON.stringify(savedMovies));
  }, [currentUser, savedMovies]);

  function likeMovie(movie) {
    moviesApi
      .addToSavedMovies(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie.createdMovie, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  }

  function dislikeMovie(movie) {
    const targetdMovie = savedMovies.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );

    moviesApi
      .removeFromSavedMovies(targetdMovie)
      .then(() => {
        const newMoviesList = savedMovies.filter((item) => {
          return !(movie.id === item.movieId || movie.movieId === item.movieId);
        });
        setSavedMovies(newMoviesList);
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="app">
          {locations.includes(location.pathname) && (
            <Header isLoggedIn={isLoggedIn} handleMenuOpen={handleMenuOpen} />
          )}
          <Routes>
            <Route
              path="/signup"
              element={
                isLoggedIn ? <Navigate to="/movies" replace /> : <Register handleRegister={handleRegister} />
              }
            />
            <Route
              path="/signin"
              element={isLoggedIn ? <Navigate to="/movies" replace /> : <Login handleSignIn={handleSignIn} />}
            />

            <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />

            <Route
              path="/movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies
                    onEmptyInput={handleEmptySearchRequest}
                    onLike={likeMovie}
                    onDislike={dislikeMovie}
                    savedMovies={savedMovies}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies
                    onEmptyInput={handleEmptySearchRequest}
                    handleSetToggler={handleChangeSavedMoviesTogglerPosition}
                    isClamped={savedMoviesTogglerPosition}
                    lastRequest={savedMoviesLastRequest}
                    setLastRequest={setSavedMoviesLastRequest}
                    onLike={likeMovie}
                    onDislike={dislikeMovie}
                    savedMovies={savedMovies}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onLogout={logOut}
                    onSubmitUpdate={handleUpdateUserData}
                    onCaseNoChanges={openErrorNotification}
                  />
                </ProtectedRoute>
              }
            />

            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
        <Menu isOpened={isMenuOpened} handleClose={handleMenuClose} />
        <Infotooltip
          isOpened={isInfoTooltipOpened}
          isAcepted={tooltipStatusAcepted}
          onClose={handleCloseInfoTooltip}
          message={tooltipMessage}
        ></Infotooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
