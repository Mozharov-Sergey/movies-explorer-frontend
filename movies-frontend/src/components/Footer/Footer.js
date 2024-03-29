import { links } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import React from 'react';

function Footer() {
  const [isSizeS, setIsSizeS] = React.useState(false);
  const thisPath = useLocation();

  React.useEffect(() => {
    function handleChangeResize() {
      if (window.screen.width <= 600) {
        setIsSizeS(true);
      } else {
        setIsSizeS(false);
      }
    }
    handleChangeResize();
    window.addEventListener('resize', handleChangeResize);
  }, []);

  return thisPath === '/' || thisPath === '/movies' || thisPath === '/saved-movies' ? (
    <div className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум x BeatFilm.</p>
      <div className="footer__hr"></div>
      <div className="footer__container">
        {!isSizeS && (
          <>
            <p className="footer__copyright-year">&copy; {new Date().getFullYear()}</p>
            <a className="footer__yp" href={links.YandexPracticum} target="_blank" rel="noreferrer">
              Яндекс.Практикум
            </a>
            <a className="footer__gh" href={links.Github} target="_blank" rel="noreferrer">
              Github
            </a>
          </>
        )}

        {isSizeS && (
          <>
            <a className="footer__yp" href={links.YandexPracticum} target="_blank" rel="noreferrer">
              Яндекс.Практикум
            </a>
            <a className="footer__gh" href={links.Github} target="_blank" rel="noreferrer">
              Github
            </a>
            <p className="footer__copyright-year">&copy; {new Date().getFullYear()}</p>
          </>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Footer;
