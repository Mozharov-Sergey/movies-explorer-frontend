import MoviesCard from '../MoviesCard/MoviesCard';
import useResize from 'use-resize';
import React from 'react';

function MoviesCardList({ moviesList, isSaved, likes }) {
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
      startSplitPosition = 16;
    } else if (768 < size.width && size.width < 980) {
      startSplitPosition = 12;
    } else if (500 < size.width && size.width < 768) {
      startSplitPosition = 8;
    } else {
      startSplitPosition = 5;
    }
    let list = Array.from(moviesList).splice(0, startSplitPosition);
    list = list.filter(Boolean);
    setShowList(list);
    setPointer(startSplitPosition - 1);
  }

  function showMoreCards(e) {
    let step = 0;
    if (size.width > 980) {
      step = 4;
    } else if (768 < size.width && size.width < 980) {
      step = 3;
    } else if (500 < size.width && size.width < 768) {
      step = 2;
    } else {
      step = 2;
    }

    let addCards = Array.from(moviesList).splice(pointer, step);
    setPointer(pointer + step);
    setShowList(showList.concat(addCards));
  }

  function showButton() {
    let step = 0;
    if (size.width > 980) {
      step = 16;
    } else if (768 < size.width && size.width < 980) {
      step = 12;
    } else if (500 < size.width && size.width < 768) {
      step = 8;
    } else {
      step = 5;
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
            if (isSaved) {
              item.isSaved = true;
              item.isLiked = true;
            } 
            
            else if (likes) {
              if (likes.includes(item.id)) {
                item.isLiked = true; 
              }
            }

            return (
              <li className="card-list__item" key={index}>
                <MoviesCard movie={item} />
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
