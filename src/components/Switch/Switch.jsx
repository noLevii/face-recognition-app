import React from "react";
import cx from "classnames";
import "./Switch.css";

const Switch = ({ rounded = false, isToggled, onToggle }) => {
  const sliderCx = cx("slider", {
    rounded: rounded,
  });

  return (
    <label className="switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={sliderCx}></span>
    </label>
  );
};

export default Switch;
