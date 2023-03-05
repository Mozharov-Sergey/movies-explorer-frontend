function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__container">

        <li className="portfolio__item">
          <a
            href="https://mozharov-sergey.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            <h3 className="portfolio__item-title">Статичный сайт</h3>
            <div className="portfolio__item-arrow"></div>
          </a>
        </li>

        <li className="portfolio__item">
          <a
            href="https://mozharov-sergey.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            <h3 className="portfolio__item-title">Адаптивный сайт</h3>
            <div className="portfolio__item-arrow"></div>
          </a>
        </li>

        <li className="portfolio__item">
          <a
            href="https://mozharov-sergey.github.io/react-mesto-auth/"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            <h3 className="portfolio__item-title">Одностраничное приложение</h3>
            <div className="portfolio__item-arrow"></div>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
