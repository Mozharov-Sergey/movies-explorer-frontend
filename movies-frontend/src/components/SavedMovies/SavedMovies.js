import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import poster1 from '../../images/cards/card_image_1.jpg';
import poster3 from '../../images/cards/card_image_3.jpg';

function SavedMovies() {
  // В слудующем этапе заменить на запрос.
  const moviesList = [
    {
      name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      duration: '1ч 42м',
      poster: poster1,
    },
    { name: '', duration: '1ч 42м' },
    {
      name: 'Gimme Danger: История Игги и The StoogesGimme Danger: История Игги и The StoogesGimme Danger: История Игги и The StoogesGimme Danger: История Игги и The StoogesGimme Danger: История Игги и The StoogesGimme Danger: История Игги и The Stooges',
      duration: '1ч 42м',
      poster: poster3,
    },
  ];

  return (
    <div className="saved-movies">
      <SearchForm></SearchForm>
      <MoviesCardList moviesList={moviesList}></MoviesCardList>
    </div>
  );
}

export default SavedMovies;
