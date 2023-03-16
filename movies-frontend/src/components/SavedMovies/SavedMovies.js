import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader/Preloader';

function SavedMovies({
  onEmptyInput,
  handleSetStartMovies,
  movies,
  handleSetToggler,
  isClamped,
  lastRequest,
  setLastRequest,
}) {
  const [savedMoviesList, setSavedMoviesList] = React.useState({});
  const [showMoviesList, setShowMoviesList] = React.useState({});
  const [filteredMoviesList, setFilteredMoviesList] = React.useState({});
  const [startMoviesList, setStartMoviesList] = React.useState({});
  const [clampShortFilms, setClampShortFilms] = React.useState(true);
  const [emptySearchResult, setEmptySearchResult] = React.useState(false);
  const [searchFailed, setSearchFailed] = React.useState(false);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [isReloaded, setIsReloaded] = React.useState(Boolean(Object.keys(movies).length));
  const [isFiltered, setisFiltered] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (Object.keys(movies).length === 0) {
      getMovies();
      handleSetStartMovies(savedMoviesList);
      setShowMoviesList(savedMoviesList);
    } else {
      setShowMoviesList(movies);
    }
  }, []);

  async function getMovies() {
    try {
      let films = await moviesApi.getSavedFilms();
      setSavedMoviesList(films);
      setShowMoviesList(films);
      return films;
    } catch (err) {
      console.log(err);
    }
  }

  function findFilmsLocal({ request, films }) {
    if (Object.keys(films).length === 0) {
      setEmptySearchResult(true);
      setShowPreloader(false);
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
    setShowMoviesList(filteredFilms);
    setShowPreloader(false);

    if (filteredFilms.length === 0) {
      setEmptySearchResult(true);
    }

    handleSetStartMovies(filteredFilms);
  }

  function SearchFilms(request) {
    setLastRequest(request);
    setEmptySearchResult(false);
    setSearchFailed(false);
    findFilmsLocal({ request, films: savedMoviesList });
    setisFiltered(true);
  }

  return (
    // У карточек, которые приходят с API нет поля isLiked, но мы знаем, что
    // все карточки, которые сохранены лайкнуты по определению.
    // За это и отвечает пропс isSaved={true}
    <>
      <div className="saved-movies">
        <SearchForm
          onClampShortFilms={handleSetToggler}
          onSubmit={SearchFilms}
          setShowPreloader={setShowPreloader}
          emptySearchResult={emptySearchResult}
          searchFailed={searchFailed}
          isShortFilmsClamped={isClamped}
          onEmptyInput={onEmptyInput}
          lastRequest={lastRequest}
        ></SearchForm>
        {showPreloader && <Preloader></Preloader>}
        <MoviesCardList moviesList={showMoviesList} isSaved={true} />
      </div>
    </>
  );
}

export default SavedMovies;
