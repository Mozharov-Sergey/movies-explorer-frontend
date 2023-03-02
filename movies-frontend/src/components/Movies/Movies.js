import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import poster1 from '../../images/cards/card_image_1.jpg';
import poster2 from '../../images/cards/card_image_2.jpg';
import poster3 from '../../images/cards/card_image_3.jpg';
import poster4 from '../../images/cards/card_image_4.jpg';
import vertical from '../../images/cards/vertical-image.jpg';
 
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
  { name: 'Вертикальный исходник', duration: '1ч 42м', poster: vertical },
  { name: 'Киноальманах «100 лет дизайна»', duration: '1ч 42м', poster: poster4 },
  { name: 'В погоне за Бенкси', duration: '1ч 42м', poster: poster1 },
  { name: 'Баския: взрыв реальности', duration: '1ч 42м', poster: poster1 },
  { name: 'Gimme Danger: История Игги и The Stooges', duration: '1ч 42м', poster: poster2 },
  { name: 'Gimme Danger: История Игги и The Stooges', duration: '1ч 42м', poster: poster3 },
  { name: 'Зона', duration: '1ч 42м', poster: poster4 },
  { name: 'Дженис: Маленькая девочка грустит', duration: '1ч 42м', poster: poster1 },
  { name: 'Киноальманах «100 лет дизайна»', duration: '1ч 42м', poster: poster4 },
  { name: 'Дженис: Маленькая девочка грустит', duration: '1ч 42м', poster: poster1 },
  { name: 'Киноальманах «100 лет дизайна»', duration: '1ч 42м', poster: poster1 },
  { name: 'Gimme Danger: История Игги и The Stooges', duration: '1ч 42м', poster: poster2 },
  { name: 'Gimme Danger: История Игги и The Stooges', duration: '1ч 42м', poster: poster3 },
  { name: 'Зона', duration: '1ч 42м', poster: poster4 },
];



function Movies() {
  return <div className="movies">
    <SearchForm></SearchForm>
    <MoviesCardList moviesList={moviesList} ></MoviesCardList>
  </div>;
}

export default Movies;
