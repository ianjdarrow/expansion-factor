import React from 'react';

const Selector = props => {
  return (
    <div>
      <label>{props.name}</label>
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        step={props.step}
        onChange={props.handleChange}
      />
      <span>{props.value}</span>
    </div>
  );
};

export default Selector;
