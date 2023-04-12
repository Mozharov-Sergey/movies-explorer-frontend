import React from 'react';

import moviesApi from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader/Preloader';
import { shortFilmDuration } from '../../utils/constants';

function Movies({ onEmptyInput }) {
  const [filteredMoviesList, setFilteredMoviesList] = React.useState({});
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [emptySearchResult, setEmptySearchResult] = React.useState(false);
  const [searchFailed, setSearchFailed] = React.useState(false);
  const [isShorts, setIsShorts] = React.useState(handleSetToggler());
  const [lastRequest, setLastRequest] = React.useState(localStorage.getItem('request'));
  const [likes, setLikes] = React.useState([]);

  React.useEffect(() => {
    setStarterFilms();
    getLikes().then(res => setLikes(res));
  }, []);

  function setStarterFilms() {
    const filteredFilms = JSON.parse(localStorage.getItem('filteredFilms'));

    if (filteredFilms) {
      setFilteredMoviesList(filteredFilms);
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
    console.log(films);
    return films;
  }

  async function getLikes() {
    const films = await moviesApi.getSavedFilms();
    const likes = films.map((item) => {
      return item.movieId;
    })
    return likes;
  }

  function findFilmsLocal(request) {
    localStorage.removeItem('filteredFilms');
    setFilteredMoviesList({});

    let films = JSON.parse(localStorage.getItem('films'));

    if (!films) {
      console.log('Нет фильмов в LocalStorage');
      return;
    }

    let filteredFilms = films.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(request.toLowerCase());
    });

    if (isShorts) {
      filteredFilms = filteredFilms.filter((movie) => {
        return movie.duration < shortFilmDuration;
      });
    }

    setFilteredMoviesList(filteredFilms);
    localStorage.setItem('filteredFilms', JSON.stringify(filteredFilms));
    setShowPreloader(false);

    if (filteredFilms.length === 0) {
      localStorage.removeItem('filteredFilms');
      setFilteredMoviesList({});
      setEmptySearchResult(true);
    }
  }

  async function Search(request) {
    setEmptySearchResult(false);
    setSearchFailed(false);
    localStorage.removeItem('filteredFilms');
    setFilteredMoviesList({});
    localStorage.setItem('request', request);

    const likes = await getLikes();
    setLikes(likes);

    try {
      let films = JSON.parse(localStorage.getItem('films'));

      // Если это первая загрузка и базы фильмов еще нет в LocalStorage
      if (!films) {
        films = await getFilms();
        films = films.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(request.toLowerCase());
        });

        if (isShorts) {
          films = films.filter((movie) => {
            return movie.duration < 40;
          });
        }

        if (Object.keys(films).length === 0) {
          localStorage.removeItem('filteredFilms');
          setEmptySearchResult(true);
        }

        localStorage.setItem('filteredFilms', JSON.stringify(films));
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
      <MoviesCardList moviesList={filteredMoviesList} likes={likes} />
    </div>
  );
}

export default Movies;
