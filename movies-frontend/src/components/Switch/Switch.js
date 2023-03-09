import React from 'react';

function Checkbox({ handleClick }) {

  return (
    <label className="switch" >
      <input type="checkbox"></input>
      <span className="slider round" onClick={handleClick}></span>
    </label>
  );
}

export default Checkbox;
