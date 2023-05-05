import React from 'react';

import avatar from '../../images/ava.jpeg';

function AboutMe() {
  const [isSizeS, setIsSizeS] = React.useState(false);

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

  return (
    <div className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <hr className="about-me__hr"></hr>
      {!isSizeS && (
        <div className="about-me__container">
          <div className="about-me__info">
            <p className="about-me__name">Сергей</p>
            <p className="about-me__subtitle">Фронтенд-разработчик, 31 год</p>
            <p className="about-me__about">
              Я родился и живу в Москве, закончил факультет кинооператорского мастерства ГИТР. Я воспитываю робкую собаку и обнаглевшего кота, а еще не могу себе представить свою жизнь без горных лыж и походов. Недавно начал кодить. С 2015 года работал Режиссером монтажа в сфере рекламы.
              В мае 2023 года закончил курс по веб-разработке от Я.Практикум.
            </p>
            <a className="about-me__github" href="https://github.com/Mozharov-Sergey?tab=repositories">
              Github
            </a>
          </div>
          <img className="about-me__photo" src={avatar} alt="моя фотка"></img>
        </div>
      )}

      {isSizeS && (
        <>
          <img className="about-me__photo" src={avatar} alt="моя фотка"></img>
          <div className="about-me__info">
            <p className="about-me__name">Виталий</p>
            <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__about">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю
              слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл
              с постоянной работы.
            </p>
            <a
              className="about-me__github"
              href="https://github.com/Mozharov-Sergey?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default AboutMe;
