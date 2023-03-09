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

function App() {
  const history = useHistory();
  const location = useLocation();

  const [isMenuOpened, setIsMenuOpened] = React.useState(false);
  const [isHeaderShow, setIsHeaderShow] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);

  React.useEffect(() => {
    if (location.pathname === '/signup' || location.pathname === '/signin') {
      setIsHeaderShow(false);
    } else {
      setIsHeaderShow(true);
    }
  }, [location]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push('/movies');
    }
  }, [isLoggedIn]);

  function handleRegister(email, password, name) {
    authApi
      .signup(email, password, name)
      .then((res) => {
        if (res) {
          console.log('profit');
          openSucessNotification();
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
        openErrorNotification();
        setErrorMessage(err.message || err.error);
      });
  }

  function handleSignIn(email, password) {
    authApi
      .signin(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setErrorMessage(err.message || err.error);
        openErrorNotification();
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      setIsLoggedIn(true);
      history.push('/movies');
    }
  }

  function openErrorNotification() {
    // Открыть попап с ошибкой
  }

  function openSucessNotification() {
    // Открыть попап с ok
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
  }

  function logOut() {
    localStorage.removeItem('token');
    history.push('/');
    setIsLoggedIn(false);
  }

  return (
    
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
            handleMenuOpen={handleMenuOpen}
            handleOpenTooltip={handleOpenTooltip}
          />
          <ProtectedRoute
            component={SavedMovies}
            path="/saved-movies/"
            isLoggedIn={isLoggedIn}
            handleMenuOpen={handleMenuOpen}
            handleOpenTooltip={handleOpenTooltip}
          />
          <ProtectedRoute
            component={Profile}
            path="/profile/"
            isLoggedIn={isLoggedIn}
            onLogout={logOut}
            handleMenuOpen={handleMenuOpen}
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
        isAcepted={false}
        onClose={handleCloseInfoTooltip}
      ></Infotooltip>
    </div>
  );
}

export default App;
