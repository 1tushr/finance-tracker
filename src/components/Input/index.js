import React from "react";
import "./styles.css";
export default function Input({ label, state, setState,placeholder,type }) {
  return (
    <div className="input-wrapper">
      <p className="input-label">{label}</p>
      <input
        // onChange={(e)=>{setState(e.target.value)}}
        type={type}
        placeholder={placeholder}
         onClick={(e) => (setState( e.target.value))}
        className="custom-input"
      ></input>
    </div>
  );
}
