import MoviesCard from '../MoviesCard/MoviesCard';
import useResize from 'use-resize';
import React from 'react';
import { showCardsStep, startCardsNumber } from '../../utils/constants';

function MoviesCardList({ moviesList, onLike, onDislike, savedMovies }) {
  const size = useResize();
  const [showMoreButton, setShowMoreButton] = React.useState(false);
  const [pointer, setPointer] = React.useState(0);
  const [showList, setShowList] = React.useState([]);

  React.useEffect(() => {
    showInitialCards();
  }, [moviesList]);

  React.useEffect(() => {
    showButton();
  }, [showList]);

  function showInitialCards() {
    setShowList([]);
    let startSplitPosition = 0;
    if (size.width > 980) {
      startSplitPosition = startCardsNumber.xl;
    } else if (768 < size.width && size.width < 980) {
      startSplitPosition = startCardsNumber.l;
    } else if (500 < size.width && size.width < 768) {
      startSplitPosition = startCardsNumber.m;
    } else {
      startSplitPosition = startCardsNumber.s;
    }
    let list = Array.from(moviesList).splice(0, startSplitPosition);
    list = list.filter(Boolean);
    setShowList(list);
    setPointer(startSplitPosition - 1);
  }

  function showMoreCards(e) {
    let step = 0;
    if (size.width > 980) {
      step = showCardsStep.l;
    } else if (768 < size.width && size.width < 980) {
      step = showCardsStep.m;
    } else if (500 < size.width && size.width < 768) {
      step = showCardsStep.s;
    } else {
      step = showCardsStep.s;
    }

    let addCards = Array.from(moviesList).splice(pointer, step);
    setPointer(pointer + step);
    setShowList(showList.concat(addCards));
  }

  function showButton() {
    let step = 0;
    if (size.width > 980) {
      step = startCardsNumber.xl;
    } else if (768 < size.width && size.width < 980) {
      step = startCardsNumber.l;
    } else if (500 < size.width && size.width < 768) {
      step = startCardsNumber.m;
    } else {
      step = startCardsNumber.s;
    }

    const isShown = showList.length >= step;
    const isEndReached = pointer >= moviesList.length;
    setShowMoreButton(isShown && !isEndReached);
  }

  return (
    <>
      {Object.keys(moviesList).length !== 0 && (
        <ul className="card-list">
          {showList.map((item, index) => {

            return (
              <li className="card-list__item" key={index}>
                <MoviesCard
                  movie={item}
                  onLike={onLike}
                  onDislike={onDislike}
                  savedMovies={savedMovies}
                />
              </li>
            );
          })}
        </ul>
      )}

      {showMoreButton && (
        <button className="more-button" type="button" onClick={showMoreCards}>
          Ещё
        </button>
      )}
    </>
  );
}

export default MoviesCardList;
