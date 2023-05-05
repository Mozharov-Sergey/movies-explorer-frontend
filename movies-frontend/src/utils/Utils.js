function findFilmsLocal({request, films, clampShortFilms}) {
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
  return filteredFilms;
  // setFilteredMoviesList(filteredFilms);
  // setShowPreloader(false);

  // if (filteredFilms.length === 0) {
  //   setEmptySearchResult(true);
  // }
}