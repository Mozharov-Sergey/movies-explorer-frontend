function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__container">
        <div className="portfolio__item">
          <a href="https://mozharov-sergey.github.io/how-to-learn/" className="portfolio__item-title">Статичный сайт</a>
          <div className="portfolio__item-arrow"></div>
        </div>
        {/* <div className="portfolio__item-hr"></div> */}

        <div className="portfolio__item">
          <a href="https://mozharov-sergey.github.io/russian-travel/" className="portfolio__item-title">Адаптивный сайт</a>
          <div className="portfolio__item-arrow"></div>
        </div>
        {/* <div className="portfolio__item-hr"></div> */}
        

        <div className="portfolio__item">
          <a href="https://mozharov-sergey.github.io/react-mesto-auth/" className="portfolio__item-title">Одностраничное приложение</a>
          <div className="portfolio__item-arrow"></div>
        </div>
        {/* <div className="portfolio__item-hr"></div> */}
        
      </div>
    </div>
  );
}

export default Portfolio;
