import card from '../../images/cards/card_image_1.jpg';
import imageNotFound from '../../images/cards/imageNotFound.png';
import React from 'react';
import moviesApi from '../../utils/MoviesApi';

function MoviesCard({ movie }) {
  const [isLiked, setIsLiked] = React.useState(movie.isLiked || movie.isSaved);
  const [posterImage, setPosterImage] = React.useState('');
  const [id, setId] = React.useState(movie.id || movie.movieId); // С моего api id приходит в поле movieId, c ЯП в полке id. Здесь приводим к общему знаменателю длдя дальнейшего использования в лайках
  const [formatedDuration, setFormatedDuratiion] = React.useState('');
  const [idOnUserServer, setIdOnUserServer] = React.useState('');

  React.useEffect(() => {
    posterProtector();
    formatDuration();
  }, []);

  React.useEffect(() => {
    const like = localStorage.getItem(`${id}`);
    if (like) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
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
    if (isLiked) {
      setIsLiked(false);
      const _id = localStorage.getItem(`${id}`);
      moviesApi.removeFromSavedMovies(movie).then(localStorage.removeItem(`${id}`));
    } else {
      const isAllreadyAdded = localStorage.getItem(`${id}`);
      if (!isAllreadyAdded) {
        moviesApi.addToSavedMovies(movie).then((res) => {
          localStorage.setItem(`${id}`, 'liked');
          movie._id = res.createdMovie._id;
          setIsLiked(true);
        });
      }
    }
  }

  return (
    <>
      {!movie.isSaved && (
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

      {movie.isSaved && isLiked && (
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
    </>
  );
}

export default MoviesCard;
 