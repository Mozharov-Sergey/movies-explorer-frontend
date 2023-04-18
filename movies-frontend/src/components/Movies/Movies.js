import React from 'react';

import moviesApi from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader/Preloader';
import { shortFilmDuration } from '../../utils/constants';

function Movies({ onEmptyInput, onLike, onDislike, savedMovies }) {
  const [filteredMoviesList, setFilteredMoviesList] = React.useState({});
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [emptySearchResult, setEmptySearchResult] = React.useState(false);
  const [searchFailed, setSearchFailed] = React.useState(false);
  const [isShorts, setIsShorts] = React.useState(handleSetToggler());
  const [lastRequest, setLastRequest] = React.useState(sessionStorage.getItem('request'));

  React.useEffect(() => {
    setStarterFilms();
  }, []);

  function setStarterFilms() {
    const filtered = JSON.parse(sessionStorage.getItem('filteredFilms'));

    if (filtered) {
      setFilteredMoviesList(filtered);
      setShowPreloader(false);
    }
  }

  function handleSetToggler() {
    let pos = localStorage.getItem('isShorts');
    if (pos === null || pos === 'false') {
      return false;
    } else {
      localStorage.setItem('isShorts', 'true');
      return true;
    }
  }

  // Сохраняем значение тумблера
  function handleSwitchShorts() {
    if (isShorts) {
      localStorage.removeItem('isShorts');
      setIsShorts(false);
    }

    if (!isShorts) {
      localStorage.setItem('isShorts', 'true');
      setIsShorts(true);
    }
  }

  async function getFilms() {
    const films = await moviesApi.getAllFilms();
    localStorage.setItem('films', JSON.stringify(films));
    return films;
  }

  function findFilmsLocal(request) {
    sessionStorage.removeItem('filteredFilms');
    setFilteredMoviesList({});
    let films = JSON.parse(localStorage.getItem('films'));

    if (!films) {
      console.log('Нет фильмов в LocalStorage');
      return;
    }

    films = films.map((item) => {
      const savedFilm = savedMovies.find((savedFilm) => {
        return savedFilm.movieId === item.id;
      });
      if (savedFilm) {
        item._id = savedFilm._id;
      }
      return item;
    });

    let filteredFilms = films.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(request.toLowerCase());
    });

    if (isShorts) {
      filteredFilms = filteredFilms.filter((movie) => {
        return movie.duration < shortFilmDuration;
      });
    }

    setFilteredMoviesList(filteredFilms);
    sessionStorage.setItem('filteredFilms', JSON.stringify(filteredFilms));
    setShowPreloader(false);

    if (filteredFilms.length === 0) {
      sessionStorage.removeItem('filteredFilms');
      setFilteredMoviesList({});
      setEmptySearchResult(true);
    }
  }

  async function Search(request) {
    setEmptySearchResult(false);
    setSearchFailed(false);
    sessionStorage.removeItem('filteredFilms');
    setFilteredMoviesList({});
    sessionStorage.setItem('request', request);

    try {
      let films = JSON.parse(localStorage.getItem('films'));

      // Если это первая загрузка и базы фильмов еще нет в LocalStorage
      if (!films) {
        films = await getFilms();
        films = films.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(request.toLowerCase());
        });

        films = films.map((item) => {
          const savedFilm = savedMovies.find((savedFilm) => {
            return savedFilm.movieId === item.id;
          });
          if (savedFilm) {
            item._id = savedFilm._id;
          }
          return item;
        });

        if (isShorts) {
          films = films.filter((movie) => {
            return movie.duration < 40;
          });
        }

        if (Object.keys(films).length === 0) {
          sessionStorage.removeItem('filteredFilms');
          setEmptySearchResult(true);
        }

        sessionStorage.setItem('filteredFilms', JSON.stringify(films));
        setFilteredMoviesList(films);
        setShowPreloader(false);
      }

      // Если фильмы уже есть в LocalStorage
      else if (films) {
        setFilteredMoviesList({});
        findFilmsLocal(request);
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
        onShortsFiltered={handleSwitchShorts}
        isShorts={isShorts}
        onSubmit={Search}
        setShowPreloader={setShowPreloader}
        emptySearchResult={emptySearchResult}
        searchFailed={searchFailed}
        onEmptyInput={onEmptyInput}
        lastRequest={lastRequest}
      ></SearchForm>
      {showPreloader && <Preloader></Preloader>}
      <MoviesCardList
        moviesList={filteredMoviesList}
        savedMovies={savedMovies}
        onLike={onLike}
        onDislike={onDislike}
      />
    </div>
  );
}

export default Movies;
