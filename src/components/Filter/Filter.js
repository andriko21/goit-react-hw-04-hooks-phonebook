import React from "react";
import style from "./Filter.module.css";

const Filter = ({ value, onChange }) => (
  <>
    <h3>Find contacts by name</h3>
    <input className={style.input} value={value} onChange={onChange} />
  </>
);

export default Filter;
