import React from 'react';

import moviesApi from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader/Preloader';
import { findFilmsLocal } from '../../utils/Utils';

function Movies({
  onEmptyInput,
  handleSetStartMovies,
  movies,
  handleSetToggler,
  isClamped,
  lastRequest,
  setLastRequest,
}) {
  const [filteredMoviesList, setFilteredMoviesList] = React.useState({});
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [emptySearchResult, setEmptySearchResult] = React.useState(false);
  const [searchFailed, setSearchFailed] = React.useState(false);

  React.useEffect(() => {
    setStarterFilms();
  }, []);

  function setStarterFilms() {
    if (movies) {
      setFilteredMoviesList(movies);
    }
  }

  function getFilms() {
    return moviesApi.getAllFilms().then((res) => {
      localStorage.setItem('films', JSON.stringify(res));
      return res;
    });
  }

  function findFilmsLocal({ request, films }) {
    if (!films) {
      console.log('Нет фильмов в LocalStorage');
      return;
    }

    let filteredFilms = films.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(request.toLowerCase());
    });

    if (isClamped) {
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

  async function Search(request) {
    setEmptySearchResult(false);
    setSearchFailed(false);
    setLastRequest(request);
    let films = JSON.parse(localStorage.getItem('films'));

    try {
      if (!films) {
        //Загрузка
        let films = await getFilms();

        // Поиск по ключевому слову
        films = films.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(request.toLowerCase());
        });

        // Отрезаем короткие метры
        if (isClamped) {
          films = films.filter((movie) => {
            return movie.duration > 40;
          });
        }

        // Если ничего не найдено
        if (Object.keys(films).length === 0) {
          setEmptySearchResult(true);
        }

        setFilteredMoviesList(films);
        setShowPreloader(false);
      } else {
        findFilmsLocal({ request, films });
      }
    } catch (err) {
      setSearchFailed(true);
      console.log(err);
      setShowPreloader(false);
    }
  }

  return (
    <div className="movies">
      <SearchForm
        onClampShortFilms={handleSetToggler}
        onSubmit={Search}
        setShowPreloader={setShowPreloader}
        emptySearchResult={emptySearchResult}
        searchFailed={searchFailed}
        isShortFilmsClamped={isClamped}
        onEmptyInput={onEmptyInput}
        lastRequest={lastRequest}
      ></SearchForm>
      {showPreloader && <Preloader></Preloader>}
      <MoviesCardList moviesList={filteredMoviesList} />
    </div>
  );
}

export default Movies;
