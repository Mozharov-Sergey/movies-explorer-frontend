function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__container">
        <div className="portfolio__item">
          <p className="portfolio__item-title">Статичный сайт</p>
          <div className="portfolio__item-arrow"></div>
        </div>
        {/* <div className="portfolio__item-hr"></div> */}

        <div className="portfolio__item">
          <p className="portfolio__item-title">Адаптивный сайт</p>
          <div className="portfolio__item-arrow"></div>
        </div>
        {/* <div className="portfolio__item-hr"></div> */}
        

        <div className="portfolio__item">
          <p className="portfolio__item-title">Одностраничное приложение</p>
          <div className="portfolio__item-arrow"></div>
        </div>
        {/* <div className="portfolio__item-hr"></div> */}
        
      </div>
    </div>
  );
}

export default Portfolio;
