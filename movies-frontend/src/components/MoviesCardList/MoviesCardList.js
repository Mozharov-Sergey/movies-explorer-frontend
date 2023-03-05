import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({moviesList, handleOpenTooltip}) {
  const step = 16;
  let toSplit = moviesList.length >= step;

  if(!moviesList || moviesList.length === 0) {
    return(<p className="card-list__not-found">Фильмов с такими параметрами не найдено</p>)
  }


  return (
    <>
      <ul className="card-list">
        {moviesList.map((item, index) => {
          return (
            <li className="card-list__item">
            <MoviesCard
              name={item.name}
              duration={item.duration}
              poster={item.poster}
              key={index} // При появлении API заменить index на _id картинки.
            ></MoviesCard>
             </li>
          );
        })}
        
      </ul>
      {toSplit && <button className="more-button" onClick={handleOpenTooltip}>Ещё</button>}
      </>
  );
}

export default MoviesCardList;
