import React from 'react';

function Checkbox({ handleClick, startPosition }) {

  const toggler = document.getElementById('toggler');
 

  function setStartPosition() {
    if (!startPosition) {
      toggler.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  }

  return (
    <label className="switch">
      <input type="checkbox"></input>
      <span className="slider round" onClick={handleClick} id="toggler"></span>
    </label>
  );
}

export default Checkbox;
