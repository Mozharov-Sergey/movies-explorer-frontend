import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({moviesList, handleOpenTooltip}) {
  const step = 16;
  let toSplit = moviesList.length >= step;

  if(!moviesList || moviesList.length === 0) {
    return(<p className="card-list__not-found">Фильмов с такими параметрами не найдено</p>)
  }


  return (
    <div className='card-list__container'>
      <div className="card-list">
        {moviesList.map((item, index) => {
          return (
            <MoviesCard
              name={item.name}
              duration={item.duration}
              poster={item.poster}
              key={index} // При появлении API заменить index на _id картинки.
            ></MoviesCard>
          );
        })}
        
      </div>
      {toSplit && <button className="card-list__more-button" onClick={handleOpenTooltip}>Ещё</button>}
      
    </div>
  );
}

export default MoviesCardList;
