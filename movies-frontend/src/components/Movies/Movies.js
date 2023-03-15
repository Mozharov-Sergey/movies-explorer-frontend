import React from 'react';

import moviesApi from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader/Preloader';
import { findFilmsLocal } from '../../utils/Utils';

function Movies({ onEmptyInput, handleSetStartMovies, movies }) {
  const [filteredMoviesList, setFilteredMoviesList] = React.useState({});
  const [clampShortFilms, setClampShortFilms] = React.useState(true);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [emptySearchResult, setEmptySearchResult] = React.useState(false);
  const [searchFailed, setSearchFailed] = React.useState(false);
  let lastRequest = sessionStorage.getItem('moviesLastRequest');

  // Проверяем, записаны ли в LocalStorage данные о предыдущей загрузке
  React.useEffect(() => {
    setStarterFilms();
    let shorts = sessionStorage.getItem('moviesShort');
    if (shorts === 'false' || shorts === null) {
      setClampShortFilms(true);
    } else {
      setClampShortFilms(false);
    }
  }, []);

  function findFilmsLocal({ request, films, clampShortFilms }) {
    if (!films) {
      console.log('Нет фильмов в LocalStorage');
      return;
    }

    let filteredFilms = films.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(request.toLowerCase());
    });

    if (clampShortFilms) {
      filteredFilms = filteredFilms.filter((movie) => {
        return movie.duration > 40;
      });
    }
    setFilteredMoviesList(filteredFilms);
    setShowPreloader(false);

    if (filteredFilms.length === 0) {
      setEmptySearchResult(true);
    }

    handleSetStartMovies(filteredFilms);
  }

  function setStarterFilms() {
    if (movies) {
      setFilteredMoviesList(movies);
    }
  }

  function handleClampShortFilms() {
    setClampShortFilms(!clampShortFilms);
  }

  function getFilms() {
    return moviesApi.getAllFilms().then((res) => {
      localStorage.setItem('films', JSON.stringify(res));
      return res;
    });
  }

  // Функция поиска фильмов
  function SearchFilms(request) {
    // Перед началом поиска убираем все сообщения об ошибках
    setEmptySearchResult(false);
    setSearchFailed(false);

    // Параметры поиска храним в сессионном хранилище
    sessionStorage.setItem('moviesLastRequest', request);
    sessionStorage.setItem('moviesShort', !clampShortFilms);

    // Если первый раз обращаемся к странице, то подгружаем фильмы через
    // функцию get films. Она же сохранит их в localStorage и в последующие
    // обращения фильмы уже будут браться из хранилища

    let films = JSON.parse(localStorage.getItem('films'));
    if (!films) {
      getFilms()
        // Приводим запрос к единнобразному виду toLowerCase()
        .then((res) =>
          res.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(request.toLowerCase());
          })
        )
        // Фильтруем короткометражки
        .then((res) => {
          if (clampShortFilms) {
            return res.filter((movie) => {
              return movie.duration < 40;
            });
          }
          return res;
        })
        // Формируем список для выдачи
        .then((res) => {
          setFilteredMoviesList(res);
          return res;
        })
        .then((res) => {
          if (Object.keys(res).length === 0) {
            setEmptySearchResult(true);
          }
          return res;
        })
        .catch((err) => {
          setSearchFailed(true);
          console.log(err);
        })
        .finally(setShowPreloader(false));

      // Если фильмы сохранены в LocalStorage, то
      // работаем с ними как с обьектом
    } else {
      findFilmsLocal({ request, films, clampShortFilms });
    }
  }

  return (
    <div className="movies">
      <SearchForm
        onClampShortFilms={handleClampShortFilms}
        onSubmit={SearchFilms}
        setShowPreloader={setShowPreloader}
        emptySearchResult={emptySearchResult}
        searchFailed={searchFailed}
        isShortFilmsClamped={clampShortFilms}
        onEmptyInput={onEmptyInput}
        lastRequest={lastRequest}
      ></SearchForm>
      {showPreloader && <Preloader></Preloader>}
      <MoviesCardList moviesList={filteredMoviesList} />
    </div>
  );
}

export default Movies;
