import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function NotFound() {
  const [isThin, setIsThin] = React.useState(false);
  const navigate = useNavigate();
  const locaion = useLocation();

  // React.useEffect(() => {
  //   function handleChangeResize() {
  //     if (window.screen.width <= 1000) {
  //       setIsThin(true);
  //     } else {
  //       setIsThin(false);
  //     }
  //   }
  //   handleChangeResize();
  //   window.addEventListener('resize', handleChangeResize);
  // }, []);

  React.useEffect(() => {
    console.log(locaion.pathname);
  })

  function handleStepBack(e) {
    e.preventDefault();
    navigate(-2);
  }

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h3 className="not-found__title">404</h3>
        <p className="not-found__message">Страница не найдена</p>    
      </div>
      <Link className="not-found__back" onClick={handleStepBack}>Назад</Link>
    </div>
  );
}

export default NotFound;
