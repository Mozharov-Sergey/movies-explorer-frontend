import React from "react";

function AboutProject() {


  const [isSizeS, setIsSizeS] = React.useState(false);

  React.useEffect(() => {
    function handleChangeResize() {
      if (window.screen.width <= 1000) {
        setIsSizeS(true);
      } else {
        setIsSizeS(false);
      }
    }
    handleChangeResize();
    window.addEventListener('resize', handleChangeResize);
  }, []);

  return (
    <div className="about-projects">
      <a name="about"></a>
      <h2 className="about-projects__title">О проекте</h2>
      <hr className="about-projects__hr"></hr>

      <div className="about-projects__container">
        <div className="about-projects__content">
          <h3 className="about-projects__content-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-projects__content-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </div>

        <div className="about-projects__content">
          <h3 className="about-projects__content-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-projects__content-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
            защититься.
          </p>
        </div>
      </div>

      <div className="about-projects__timeline">
        <div className="about-projects__timeline-backend">
          <p className="about-projects__timeline-label">1 неделя</p>
        </div>
        <div className="about-projects__timeline-frontend">
          <p className="about-projects__timeline-label">4 недели</p>
        </div>
      </div>
      <div className="about-projects__timeline-subtitles">
        <p className="about-projects__timeline-subtitles-item">Back-end</p>
        <p className="about-projects__timeline-subtitles-item">Front-end</p>
      </div>
    </div>
  );
}

export default AboutProject;
