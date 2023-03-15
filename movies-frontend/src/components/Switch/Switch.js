import React from 'react';

function Checkbox({ handleClick, isChecked }) {

  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleClick}></input>
      <span className="slider round" id="toggler"></span>
    </label>
  );
}

export default Checkbox;
