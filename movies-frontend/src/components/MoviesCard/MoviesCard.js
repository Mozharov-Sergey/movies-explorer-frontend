import imageNotFound from '../../images/cards/imageNotFound.png';
import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, onLike, onDislike, savedMovies }) {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = React.useState(movie.isLiked);
  const [posterImage, setPosterImage] = React.useState('');
  const [formatedDuration, setFormatedDuratiion] = React.useState('');

  React.useEffect(() => {
    posterProtector();
    formatDuration();
  });

  React.useEffect(() => {
    setIsLiked(getSavedMovie(savedMovies, movie));
  });

  function posterProtector() {
    if (movie.image.url) {
      setPosterImage('https://api.nomoreparties.co' + movie.image.url);
    } else if (movie.image) {
      setPosterImage(movie.image);
    } else {
      setPosterImage(imageNotFound);
    }
  }

  function formatDuration() {
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    setFormatedDuratiion(`${hours}ч ${minutes}мин`);
  }

  function getSavedMovie(list, movie) {
    if (list) {
      return list.find((item) => {
        return item.movieId === (movie.id || movie.movieId);
      });
    }
  }

  function handleLike() {
    onLike(movie);
  }

  function handleDislike() {
    onDislike(movie);
  }

  return (
    <div className="movies-card">
      <a href={movie.trailerLink} target="_blank">
        <img className="movies-card__image" src={posterImage} alt={movie.image.alternativeText}></img>
      </a>
      <div className="movies-card__info">
        <p className="movies-card__title">{movie.nameRU}</p>
        {pathname === '/movies' && (
          <button
            onClick={isLiked ? handleDislike : handleLike}
            className={`movies-card__like ${isLiked && 'movies-card__like_active'}`}
            type="button"
          ></button>
        )}
        {pathname === '/saved-movies' && (
          <button onClick={handleDislike} className="movies-card__delete" type="button"></button>
        )}
      </div>
      <div className="movies-card__hr"></div>
      <p className="movies-card__duration">{formatedDuration}</p>
    </div>
  );
}

export default MoviesCard;
