import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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
import { CurrentUserContext } from '../../contexts/currentUserContext';

function App() {
  const history = useHistory();
  const location = useLocation();

  const [isMenuOpened, setIsMenuOpened] = React.useState(false);
  const [isHeaderShow, setIsHeaderShow] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [tooltipMessage, setTooltipMessage] = React.useState('');
  const [tooltipStatusAcepted, setTooltipStatusAcepted] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  //Movies
  const [startMovies, setStartMovies] = React.useState({});
  const [moviesTogglerPosition, setMoviesTogglerPosition] = React.useState(true);
  const [moviesLastRequest, setMoviesLastRequest] = React.useState('');

  //SavedMovies
  const [startSavedMovies, setStartSavedMovies] = React.useState({});
  const [savedMoviesTogglerPosition, setSavedMoviesTogglerPosition] = React.useState(true);
  const [savedMoviesLastRequest, setSavedMoviesLastRequest] = React.useState('');

  function handleChangeMoviesTogglerPosition() {
    setMoviesTogglerPosition(!moviesTogglerPosition);
  }

  function handleChangeSavedMoviesTogglerPosition() {
    setSavedMoviesTogglerPosition(!savedMoviesTogglerPosition);
  }

  // На страницах регистрации и авторизации шапка не показывается.
  // Этот хук отвечает за показ шапки на этих страницах
  React.useEffect(() => {
    if (location.pathname === '/signup' || location.pathname === '/signin') {
      setIsHeaderShow(false);
    } else {
      setIsHeaderShow(true);
    }
  }, [location]);

  // Нужно для сохранения информации о пользователе между перезагрузками страницы
  React.useEffect(() => {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    if (currentUser.name !== name && currentUser.email !== email) {
      setCurrentUser({ email, name });
    }
  }, [currentUser]);

  React.useEffect(() => {
    tokenCheck();
    // localStorage.clear();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push('/movies');
    }
  }, [isLoggedIn]);

  function handleUpdateUserData({ email, name }) {
    authApi
      .updateUserData(email, name)
      .then((res) => {
        localStorage.setItem('userName', res.name);
        localStorage.setItem('userEmail', res.email);
        setCurrentUser({ email: res.email, name: res.name });
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(email, password, name) {
    authApi
      .signup(email, password, name)
      .then((res) => {
        if (res) {
          setTooltipMessage('Вы успешно зарегистрированы!');
          openSucessNotification();
        }
      })
      .then(() => {
        authApi.signin(email, password).then((res) => {
          localStorage.setItem('token', res.token);
          setIsLoggedIn(true);
        });
      })
      .catch((err) => {
        openErrorNotification(err.validation.body.message || err.error);
      });
  }

  function handleSignIn(email, password) {
    authApi
      .signin(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
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

  function tokenCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      setIsLoggedIn(true);
      history.push('/movies');
    }
  }

  function openErrorNotification(message) {
    setTooltipMessage(message);
    setTooltipStatusAcepted(false);
    setIsInfoTooltipOpened(true);
  }

  function openSucessNotification() {
    setIsInfoTooltipOpened(true);
    setTooltipStatusAcepted(true);
  }

  function handleMenuClose() {
    setIsMenuOpened(false);
  }

  function handleMenuOpen() {
    setIsMenuOpened(true);
  }

  function handleOpenTooltip() {
    setIsInfoTooltipOpened(true);
  }

  function handleCloseInfoTooltip() {
    setIsInfoTooltipOpened(false);
    setTooltipMessage('');
  }

  function handleEmptySearchRequest() {
    setIsInfoTooltipOpened(false);
    setTooltipMessage('Введите поисковый запрос');
    handleOpenTooltip();
  }

  function logOut() {
    localStorage.removeItem('token');
    history.push('/');
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="app">
          {isHeaderShow && <Header isLoggedIn={isLoggedIn} handleMenuOpen={handleMenuOpen}></Header>}

          <Switch>
            <Route path="/signup/">
              <Register handleRegister={handleRegister} />
            </Route>

            <Route path="/signin/">
              <Login handleSignIn={handleSignIn} />
            </Route>

            <ProtectedRoute
              component={Movies}
              path="/movies/"
              isLoggedIn={isLoggedIn}
              onEmptyInput={handleEmptySearchRequest}
              movies={startMovies}
              handleSetStartMovies={setStartMovies}
              handleSetToggler={handleChangeMoviesTogglerPosition}
              isClamped={moviesTogglerPosition}
              lastRequest={moviesLastRequest}
              setLastRequest={setMoviesLastRequest}
            />
            <ProtectedRoute
              component={SavedMovies}
              path="/saved-movies/"
              isLoggedIn={isLoggedIn}
              onEmptyInput={handleEmptySearchRequest}
              movies={startSavedMovies}
              handleSetStartMovies={setStartSavedMovies}
              handleSetToggler={handleChangeSavedMoviesTogglerPosition}
              isClamped={savedMoviesTogglerPosition}
              lastRequest={savedMoviesLastRequest}
              setLastRequest={setSavedMoviesLastRequest}
            />
            <ProtectedRoute
              component={Profile}
              path="/profile/"
              isLoggedIn={isLoggedIn}
              onLogout={logOut}
              onSubmitUpdate={handleUpdateUserData}
            />

            <Route exact path="/">
              <Main isLoggedIn={isLoggedIn} />
            </Route>

            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
          <Footer></Footer>
        </div>
        <Menu isOpened={isMenuOpened} handleClose={handleMenuClose}></Menu>
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
