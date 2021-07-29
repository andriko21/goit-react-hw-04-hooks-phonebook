import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./Form.module.css";


const Form = ({ contacts, addContactItem }) => {
  const [state, setState] = useState({
    name: "",
    number: "",
  });

  const onCHangeInput = (ev) => {
    setState((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));

 
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    // console.log(contacts.some(
    //   ({ name }) => name.toLowerCase() === ev.currentTarget.name.value.toLowerCase() 
        
         
    //   ))
    if (
      contacts.find(
        ({ name }) => {
          return  name.toLowerCase() === ev.currentTarget.name.value.toLowerCase() 
        }
         
      )
    ) {
      return alert(`${ev.currentTarget.name.value} is already registered`);
    }

    const contact = {
      name: ev.currentTarget.name.value,
      number: ev.currentTarget.number.value,
      id: uuidv4(),
    };
    addContactItem(contact);
    reset()
  };

  const reset = () => {
    setState({
      name: "",
      number: "",
    });
  };

  return (
    <div className={style.container}>
      <h1>Phonebook</h1>
      <div className={style.addContact__container}>
        <h2>Name</h2>
        <form className={style.form} onSubmit={onSubmit}>
          <input
            className={style.input}
            type="text"
            name="name"
            value={state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={onCHangeInput}
          />
          <h3>Number</h3>
          <input
            className={style.input}
            type="tel"
            name="number"
            value={state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={onCHangeInput}
          />
          <button type="submit" className={style.button}>
            add contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
