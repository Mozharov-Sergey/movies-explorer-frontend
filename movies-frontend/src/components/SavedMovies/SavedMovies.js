import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader/Preloader';
import { shortFilmDuration } from '../../utils/constants';

function SavedMovies({
  onEmptyInput,
  handleSetStartMovies,
  // handleSetToggler,
  onLike,
  onDislike,
  savedMovies,
}) {
  const [showMoviesList, setShowMoviesList] = React.useState({});
  const [emptySearchResult, setEmptySearchResult] = React.useState(false);
  const [searchFailed, setSearchFailed] = React.useState(false);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [isShorts, setIsShorts] = React.useState(handleSetToggler());
  const [filteredList, setFilteredList] = React.useState([]);

  React.useEffect(() => {
    if (savedMovies) {
      setShowMoviesList(savedMovies);
      handleSetStartMovies(savedMovies);
    } else {
      setShowMoviesList(savedMovies);
    }
  }, []);

  function handleDislike(movie) {
    onDislike(movie);
    const updatedMovieList = showMoviesList.filter((item) => {
      if (movie.movieId !== item.movieId) {
        return item;
      }
    });
    setShowMoviesList(updatedMovieList);
  }

  function findFilmsLocal(request) {
    let films = savedMovies;

    let filteredFilms = films.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(request.toLowerCase());
    });

    if (isShorts) {
      filteredFilms = filteredFilms.filter((movie) => {
        return movie.duration < shortFilmDuration;
      });
    }

    setShowMoviesList(filteredFilms);
    setFilteredList(filteredFilms);
    setShowPreloader(false);

    if (filteredFilms.length === 0) {
      setShowMoviesList({});
      setEmptySearchResult(true);
    }
  }

  function SearchFilms(request) {
    setEmptySearchResult(false);
    setSearchFailed(false);
    findFilmsLocal(request);
  }

  function handleSetToggler() {
    let pos = localStorage.getItem('isSavedShorts');
    if (pos === null || pos === 'false') {
      return false;
    } else {
      localStorage.setItem('isSavedShorts', 'true');
      return true;
    }
  }

  // Сохраняем значение тумблера
  function handleSwitchShorts() {
    if (isShorts) {
      localStorage.removeItem('isSavedShorts');
      setIsShorts(false);
    }

    if (!isShorts) {
      localStorage.setItem('isSavedShorts', 'true');
      setIsShorts(true);
    }
  }

  return (
    <>
      <div className="saved-movies">
        <SearchForm
          onShortsFiltered={handleSwitchShorts}
          isShorts={isShorts}
          onSubmit={SearchFilms}
          setShowPreloader={setShowPreloader}
          emptySearchResult={emptySearchResult}
          searchFailed={searchFailed}
          onEmptyInput={onEmptyInput}
        ></SearchForm>
        {showPreloader && <Preloader></Preloader>}
        <MoviesCardList
          moviesList={showMoviesList}
          onLike={onLike}
          onDislike={handleDislike}
          savedMovies={savedMovies}
        />
      </div>
    </>
  );
}

export default SavedMovies;
