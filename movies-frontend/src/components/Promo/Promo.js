import React from 'react';
import useResize from 'use-resize';

function Promo() {
  const [isThin, setIsThin] = React.useState(false);

  const size = useResize();

  React.useEffect(() => {
    if (size.width < 1000) {
      setIsThin(true);
    } else {
      setIsThin(false);
    }
  }, [size]);

  return (
    <>
      <div className="promo">
        {!isThin && <div className="promo__logo"></div>}
        {isThin && <div className="promo__logo-thin"></div>}
        <h1 className="promo__title">
          Учебный проект студента факультета {!isThin && <br></br>} Веб-разработки.
        </h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a href="#about" className="promo__more">
          Узнать больше
        </a>
      </div>
    </>
  );
}

export default Promo;
