import card from '../../images/cards/card_image_1.jpg';
import imageNotFound from '../../images/cards/imageNotFound.png';
import React from 'react';

function MoviesCard({movie }) {
  let [isLiked, setIsLiked] = React.useState(false);

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  let posterImage = "https://api.nomoreparties.co/" + movie.image.url;


  if (!movie.image.url) {
    posterImage = imageNotFound;
  }

  return (
    <div className="movies-card">
      <img className="movies-card__image" src={posterImage} alt={movie.image.alternativeText}></img>
      <div className="movies-card__info">
        <p className="movies-card__title">{movie.nameRU}</p>
        <button
          className={`movies-card__like ${isLiked && 'movies-card__like_active'}`}
          onClick={handleLikeClick}
        ></button>
      </div>
      <div className="movies-card__hr"></div>
      <p className="movies-card__duration">{movie.duration}</p>
    </div>
  );
}

export default MoviesCard;
