import Switch from '../Switch/Switch';
import React from 'react';

function SearchForm({ onSubmit, setShowPreloader, emptySearchResult, searchFailed, onClampShorts }) {
  const [input, setInput] = React.useState('');
  const [isEmptyRequest, setIsEmptyRequest] = React.useState(false);
  

  React.useEffect(() => {
    if (input === '') {
      setIsEmptyRequest(true);
    } else {
      setIsEmptyRequest(false);
    }
  }, [input]);

  React.useEffect(() => {
    setIsEmptyRequest(false);
  }, []);

  function handleSubmit(e) {
    setShowPreloader(true);
    e.preventDefault();
    if (input !== '') {
      onSubmit(input);
    } else {
      setIsEmptyRequest(true);
    }
  }

  function handleChange(e) {
    setInput(e.target.value);
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
            value={input || ''}
            required
          ></input>
          <button className="search-form__button-submit" onClick={handleSubmit}>
            Поиск
          </button>
          {isEmptyRequest && (
            <span className="search-form__input-error-message">Ошибка: Нужно ввести ключевое слово</span>
          )}
          <div className="search-form__switch">
            <Switch handleClick={onClampShorts}></Switch>
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
