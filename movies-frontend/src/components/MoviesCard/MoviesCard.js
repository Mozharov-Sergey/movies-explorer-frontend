import card from '../../images/cards/card_image_1.jpg';
import imageNotFound from '../../images/cards/imageNotFound.png';
import React from 'react';
import moviesApi from '../../utils/MoviesApi';

function MoviesCard({ movie }) {
  const [isLiked, setIsLiked] = React.useState(movie.isLiked);
  const [isSaved, setIsSaved] = React.useState(movie.isSaved);
  const [posterImage, setPosterImage] = React.useState('');
  const [formatedDuration, setFormatedDuratiion] = React.useState('');

  React.useEffect(() => {
    posterProtector();
    formatDuration();
  });

  React.useEffect(() => {
    if (movie.isLiked) {
      setIsLiked(true);
    }
  });

  function posterProtector() {
    if (movie.isSaved) {
      if (!movie.image) {
        setPosterImage(imageNotFound);
      } else {
        setPosterImage(movie.image);
      }
    } else {
      if (!movie.image.url) {
        setPosterImage(imageNotFound);
      } else {
        setPosterImage('https://api.nomoreparties.co' + movie.image.url);
      }
    }
  }

  function formatDuration() {
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    setFormatedDuratiion(`${hours}ч ${minutes}мин`);
  }

  function handleLikeClick() {
    if (!isSaved && !isLiked) {
      moviesApi.addToSavedMovies(movie).then((res) => {
        movie._id = res.createdMovie._id;
        setIsLiked(true);
      });
    }
  }

  function handleRemoveCard() {
    if (isSaved || isLiked) {
      setIsSaved(false);
      setIsLiked(false);
      moviesApi.removeFromSavedMovies(movie);
    }
  }

  return (
    <>
      {!isSaved && !movie.isSaved && (
        <div className="movies-card">
          <a href={movie.trailerLink} target="_blank">
            <img className="movies-card__image" src={posterImage} alt={movie.image.alternativeText}></img>
          </a>
          <div className="movies-card__info">
            <p className="movies-card__title">{movie.nameRU}</p>
            <button
              className={`movies-card__like ${isLiked && 'movies-card__like_active'}`}
              onClick={handleLikeClick}
            ></button>
          </div>
          <div className="movies-card__hr"></div>
          <p className="movies-card__duration">{formatedDuration}</p>
        </div>
      )}

      {isSaved && (
        <div className="movies-card">
          <a href={movie.trailerLink} target="_blank">
            <img className="movies-card__image" src={posterImage} alt={movie.image.alternativeText}></img>
          </a>
          <div className="movies-card__info">
            <p className="movies-card__title">{movie.nameRU}</p>
            <button className="movies-card__delete" onClick={handleRemoveCard}></button>
          </div>
          <div className="movies-card__hr"></div>
          <p className="movies-card__duration">{formatedDuration}</p>
        </div>
      )}
    </>
  );
}

export default MoviesCard;
