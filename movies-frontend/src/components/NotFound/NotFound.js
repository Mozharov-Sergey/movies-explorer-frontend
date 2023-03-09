import React from 'react';

function NotFound() {
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
    <div className="not-found">
      <div className="not-found__container">
        <h3 className="not-found__title">404</h3>
        <p className="not-found__message">Страница не найдена</p>
        <p className={`not-found__back ${isThin && 'not-found__back_position_down'}`}>Назад</p>
      </div>
    </div>
  );
}

export default NotFound;
