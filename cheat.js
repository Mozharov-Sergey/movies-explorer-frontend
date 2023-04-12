import './App.css';
import { Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundError from '../NotFoundError/NotFoundError';
import Footer from '../Footer/Footer';
import InfoTooltip from '../InfoToolTip/InfoToolTip';
import * as auth from "../../utils/Auth.js";
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false); // стейт статуса авторизации юзера
  const [isLoading, setIsLoading] = useState(false); //стэйт лоадера


// Функциональность регистрации и авторизации
  function registration(name, email, password) {
    auth
      .register(name, email, password)
      .then((user) => {
        setIsInfoTooltip({
          isOpen: true,
          isOk: true,
          text: 'Вы успешно зарегистрированы!',
        });
        console.log(user);
        // navigate('/signin');
        authorization(email, password);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltip({
          isOpen: true,
          isOk: false,
          text: '',
        });
      });
  }

  function authorization(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        setIsInfoTooltip({
          isOpen: true,
          isOk: true,
          text: 'Добро пожаловать',
        });
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltip({
          isOpen: true,
          isOk: false,
          text: '',
        });
      });
  }

  // выход из акканута
  function logout() {
    setLoggedIn(false);
    navigate('/');
    setCurrentUser({});
    localStorage.clear();
  }

  // проверка токена и авторизация
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const path = location.pathname;

    if (jwt) {
      mainApi
        .getUser()
        .then((data) => {
          setLoggedIn(true);
          navigate(path);
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);








  return (
    <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
      <Header>
        <NavTab loggedIn={loggedIn} />
      </Header>
      <Routes>
        <Route path='/signup' element={!loggedIn ? (<Register registration={registration} />) : (<Navigate to='/movies' replace />) } />
        <Route path='/signin' element={!loggedIn ? (<Login authorization={authorization} />) : (<Navigate to='/movies' replace />) } />
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Movies 
              isLoading={isLoading} 
              setIsLoading={setIsLoading}
              savedMovies={savedMovies}
              onLikeClick={saveMovie}
              onDeleteClick={deleteMovie}
              setIsInfoTooltip={setIsInfoTooltip}
              loggedIn={loggedIn}
            />
          </ProtectedRoute>} 
        />
        <Route path='/saved-movies' element={
          <ProtectedRoute loggedIn={loggedIn}>
            <SavedMovies
              savedMovies={savedMovies}
              onDeleteClick={deleteMovie}
              isLoading={isLoading} 
              setIsLoading={setIsLoading}
            />
          </ProtectedRoute>} 
         />
        <Route path='/profile' element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Profile 
            logout={logout} 
            handleProfile={handleProfile} 
            />
          </ProtectedRoute>} 
        />
        <Route path='/*' element={<NotFoundError />} />
      </Routes>
      <Footer />

      <InfoTooltip
        isOpen={isInfoTooltip.isOpen}
        onClose={handleClosePopup}
        isOk={isInfoTooltip.isOk}
        text={isInfoTooltip.text}
      />

    </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
