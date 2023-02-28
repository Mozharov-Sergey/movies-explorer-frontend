import React from 'react';
import { Route, Switch, useHistory, Link } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';

function App() {
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  function handleMenuClose() {
    setIsMenuOpened(false);
  }

  function handleMenuOpen() {
    setIsMenuOpened(true);
  }

  return (
    <div className="root">
      <div className="app">
        <Switch>
          <Route path="/signup/">
            <Register />
          </Route>

          <Route path="/signin/">
            <Login />
          </Route>

          <ProtectedRoute
            component={Movies}
            path="/movies/"
            isLoggedIn={true}
            handleMenuOpen={handleMenuOpen}
          />
          <ProtectedRoute
            component={SavedMovies}
            path="/saved-movies/"
            isLoggedIn={true}
            handleMenuOpen={handleMenuOpen}
          />
          <ProtectedRoute
            component={Profile}
            path="/profile/"
            isLoggedIn={true}
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
    </div>
  );
}

export default App;
