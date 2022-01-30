import React from "react";
import "./auth.css";

const Input = ({ label, name, type, handleChange, placeholder }) => {
  return(
  <>
    <div className="flex-row">
      <label className="lf--label">{label}</label>
      <input
        className="lf--input"
        onChange={handleChange}
        name={name}
        type={type}
        placeholder={placeholder}
        required
      />
    </div>
  </>
  )
};

export default Input;

