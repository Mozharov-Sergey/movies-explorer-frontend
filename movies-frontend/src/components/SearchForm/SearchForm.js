import Switch from '../Switch/Switch';

function SearchForm({handleOpenTooltip}) {

  

  return (
    <div className="search-form">
      <form className="search-form__form">
        <input className="search-form__bar" type="text" placeholder="Фильм"></input>
        <button className="search-form__button-submit" onClick={handleOpenTooltip}>Поиск</button>
        <div className="search-form__switch">
          <Switch></Switch>
          <label className='search-form__switch-label'>Короткометражки</label>
        </div>
      </form>
      <div className="search-form__br"></div>
    </div>
  );
}

export default SearchForm;
