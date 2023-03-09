import React from 'react';

import moviesApi from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader/Preloader';

function Movies({ handleOpenTooltip }) {
  const [filteredMoviesList, setFilteredMoviesList] = React.useState({});
  const [searchRequest, setSearchRequest] = React.useState('');
  const [clampShortFilms, setClampShortFilms] = React.useState(true);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [emptySearchResult, setEmptySearchResult] = React.useState(false);
  const [searchFailed, setSearchFailed] = React.useState(false);

  function handleClampShortFilms() {
    setClampShortFilms(!clampShortFilms);
  }

  // Функция поиска фильмов
  function SearchFilms(request) {
    // Перед началом поиска убираем все сообщения об ошибках
    setEmptySearchResult(false);
    setSearchFailed(false);

    moviesApi
      .getAllFilms()
      .then((res) =>
        res.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(request.toLowerCase());
        })
      )

      // Проверка на короткометражность фильмов
      .then((res) => {
        if (clampShortFilms) {
          return res.filter((movie) => {
            return movie.duration < 70;
          });
        }
        return res;
      })

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
      })
      .finally((res) => setShowPreloader(false));
  }

  return (
    <div className="movies">
      <SearchForm
        onClampShorts={handleClampShortFilms}
        onSubmit={SearchFilms}
        setShowPreloader={setShowPreloader}
        emptySearchResult={emptySearchResult}
        searchFailed={searchFailed}
      ></SearchForm>
      {showPreloader && <Preloader></Preloader>}

      <MoviesCardList moviesList={filteredMoviesList} handleOpenTooltip={handleOpenTooltip} />
    </div>
  );
}

export default Movies;
