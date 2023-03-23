import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader/Preloader';

function SavedMovies({ onEmptyInput, handleSetStartMovies, movies, handleSetToggler }) {
  const [savedMoviesList, setSavedMoviesList] = React.useState({});
  const [showMoviesList, setShowMoviesList] = React.useState({});
  const [emptySearchResult, setEmptySearchResult] = React.useState(false);
  const [searchFailed, setSearchFailed] = React.useState(false);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [isShorts, setIsShorts] = React.useState(handleSetToggler());

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

  function findFilmsLocal(request) {
    let films = savedMoviesList;

    // if (!request) {
    //   setShowPreloader(false);
    //   onEmptyInput();
    //   return;
    // }

    let filteredFilms = films.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(request.toLowerCase());
    });

    if (isShorts) {
      filteredFilms = filteredFilms.filter((movie) => {
        return movie.duration < 40;
      });
    }

    setShowMoviesList(filteredFilms);
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
    // У карточек, которые приходят с API нет поля isLiked, но мы знаем, что
    // все карточки, которые сохранены лайкнуты по определению.
    // За это и отвечает пропс isSaved={true}
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
        <MoviesCardList moviesList={showMoviesList} isSaved={true} />
      </div>
    </>
  );
}

export default SavedMovies;
