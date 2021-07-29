import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./Form.module.css";

export default class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  onCHangeInput = (ev) => {
    const { name, value } = ev.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    // console.log(ev.currentTarget.name.value)
    if (this.props.contacts.some(({name}) => name.toLowerCase() === ev.currentTarget.name.value.toLowerCase())) {
      return alert(`${ev.currentTarget.name.value} is already registered`);
    }

    const contact = {
      name: ev.currentTarget.name.value,
      number: ev.currentTarget.number.value,
      id: uuidv4(),
    };
    this.props.addContactItem(contact);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    return (
      <div className={style.container}>
        <h1>Phonebook</h1>
        <div className={style.addContact__container}>
          <h2>Name</h2>
          <form className={style.form} onSubmit={this.onSubmit}>
            <input
              className={style.input}
              type="text"
              name="name"
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              onChange={this.onCHangeInput}
            />
            <h3>Number</h3>
            <input
              className={style.input}
              type="tel"
              name="number"
              value={this.state.number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              onChange={this.onCHangeInput}
            />
            <button type="submit" className={style.button}>
              add contact
            </button>
          </form>
        </div>
      </div>
    );
  }
}
