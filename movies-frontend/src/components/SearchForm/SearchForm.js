import Switch from '../Switch/Switch';
import React from 'react';

import Infotooltip from '../InfoTooltip/InfoTooltip';

function SearchForm({
  onSubmit,
  onEmptyInput,
  setShowPreloader,
  emptySearchResult,
  searchFailed,
  onClampShorts,
  isShortFilmsClamped,
}) {
  const [input, setInput] = React.useState('');
  const [isEmptyRequest, setIsEmptyRequest] = React.useState(false);
  const [request, setRequest] = React.useState(sessionStorage.getItem('lastRequest')); // Записиывается при событии Submit
  const [isShortFilmsClampeded, setIsShortFilmsClampeded] = React.useState(
    sessionStorage.getItem('clampShortFilms')
  ); // НУЖНО БУДЕТ СДЕЛАТЬ НА ОСНОВЕ ЭТОЙ  СОСТОЯНИЕ ТУМБЛЕРА
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [tooltipMessage, setTooltipMessage] = React.useState('');
  const [tooltipStatusAcepted, setTooltipStatusAcepted] = React.useState(false);

  React.useEffect(() => {
    if (input === '') {
      setIsEmptyRequest(true);
    } else {
      setIsEmptyRequest(false);
    }
  }, [input]);

  React.useEffect(() => {
    setIsEmptyRequest(false);
    setInput(request);
  }, []);


  function handleSubmit(e) {
    e.preventDefault();
    if (input === null) {
      onEmptyInput();
      return;
    }

    if (input !== '') {
      setShowPreloader(true);
      onSubmit(input);
    } else {
      setIsEmptyRequest(true);
    }
  }

  function closeTooltip() {
    setIsInfoTooltipOpened(false);
  }

  function handleChange(e) {
    setInput(e.target.value);
    setRequest(e.target.value);
  }

  return (
    <>
      <div className="search-form">
        <form noValidate className="search-form__form">
          <input
            className="search-form__bar"
            type="text"
            placeholder="Фильм"
            onChange={handleChange}
            value={input || request || ''}
            required
          ></input>
          <button className="search-form__button-submit" onClick={handleSubmit}>
            Поиск
          </button>
          {isEmptyRequest && (
            <span className="search-form__input-error-message">Ошибка: Нужно ввести ключевое слово</span>
          )}
          <div className="search-form__switch">
            <Switch handleClick={onClampShorts} startPosition={isShortFilmsClamped}></Switch>
            <label className="search-form__switch-label">Короткометражки</label>
          </div>
          <div className="search-form__br"></div>
          {emptySearchResult && <span className="search-form__error">Ничего не найдено</span>}
          {searchFailed && (
            <span className="search-form__error">
              Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
              Подождите немного и попробуйте ещё раз.
            </span>
          )}
        </form>
      </div>
    </>
  );
}

export default SearchForm;
