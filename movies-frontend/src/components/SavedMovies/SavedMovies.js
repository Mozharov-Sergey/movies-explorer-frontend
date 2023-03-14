import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader/Preloader';

function SavedMovies({ onEmptyInput }) {
  const [savedMoviesList, setSavedMoviesList] = React.useState([]);
  const [clampShortFilms, setClampShortFilms] = React.useState(true);
  const [emptySearchResult, setEmptySearchResult] = React.useState(false);
  const [searchFailed, setSearchFailed] = React.useState(false);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [filteredMoviesList, setFilteredMoviesList] = React.useState({});
  const [isFiltered, setisFiltered] = React.useState(false);

  React.useEffect(() => {
    moviesApi.getSavedFilms().then((res) => setSavedMoviesList(res));
  }, []);

  function handleClampShortFilms() {
    setClampShortFilms(!clampShortFilms);
  }

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
  }

  function SearchFilms(request) {
    setEmptySearchResult(false);
    setSearchFailed(false);
    findFilmsLocal({ request, films: savedMoviesList, clampShortFilms });
    setisFiltered(true);
  }

  return (
    // У карточек, которые приходят с API нет поля isLiked, но мы знаем, что
    // все карточки, которые сохранены лайкнуты по определению.
    // За это и отвечает пропс isSaved={true}
    <>
      <div className="saved-movies">
        <SearchForm
          onClampShorts={handleClampShortFilms}
          onSubmit={SearchFilms}
          setShowPreloader={setShowPreloader}
          emptySearchResult={emptySearchResult}
          searchFailed={searchFailed}
          isShortFilmsClamped={clampShortFilms}
          onEmptyInput={onEmptyInput}
        ></SearchForm>
        {showPreloader && <Preloader></Preloader>}
        {!isFiltered && <MoviesCardList moviesList={savedMoviesList} isSaved={true}></MoviesCardList>}
        {isFiltered && <MoviesCardList moviesList={filteredMoviesList} isSaved={true}></MoviesCardList>}
      </div>
    </>
  );
}

export default SavedMovies;
