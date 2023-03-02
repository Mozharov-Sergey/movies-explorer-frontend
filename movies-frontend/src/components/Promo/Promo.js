import React from 'react';

function Promo() {
  const [isThin, setIsThin] = React.useState(false);

  React.useEffect(() => {
    function handleChangeResize() {
      if (window.screen.width <= 1000) {
        setIsThin(true);
      } else {
        setIsThin(false);
      }
    }
    handleChangeResize();
    window.addEventListener('resize', handleChangeResize);
  }, []);

  return (
    <>
      <div className="promo">
        {!isThin && <div className="promo__logo"></div>}
        {isThin && <div className="promo__logo-thin"></div>}
        <h1 className="promo__title">
          Учебный проект студента факультета {!isThin && <br></br>} Веб-разработки.
        </h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a href="#about" className="promo__more">Узнать больше</a>
      </div>
    </>
  );
}

export default Promo;
