import React from "react";
import "./styles.css";

const Input = ({ label, state, setState, placeholder, type }) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className="input-wrapper">
      <p className="input-label">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={handleChange}
        className="custom-input"
      />
    </div>
  );
};

export default Input;
