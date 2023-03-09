import { usedTechnologies } from "../../utils/constants";

function Techs() {
  return (
    <div className="techs">
      <h2 className="techs__title">Технологии</h2>
      <hr className="techs__hr"></hr>
      <h3 className="techs__label">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      
      <ul className="techs__container">
        {usedTechnologies.map((item, index) => {
          return (
            <li className="techs__item" key={index}>
              <p className="techs__item-text">{item}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Techs;
