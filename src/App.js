import React, { Component } from "react";
// import style from "./index.module.css";
import { v4 as uuidv4 } from "uuid";

import Form from "./components/Form/Form";
import ContactList from "./components/ContactLIst/ContactList";
import Filter from "./components/Filter/Filter";

export default class App extends Component {
  static defaultProps = {
    contacts: [
      { id: uuidv4(), name: "Rosie Simpson", number: "459-12-56" },
      { id: uuidv4(), name: "Hermione Kline", number: "443-89-12" },
      { id: uuidv4(), name: "Eden Clements", number: "645-17-79" },
      { id: uuidv4(), name: "Annie Copeland", number: "227-91-26" },
    ],
  };

  state = {
    contacts: [...this.props.contacts],
    filter: "",
  };

  componentDidMount() {
    if (localStorage.getItem("contacts")) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem("contacts")),
      });

    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    console.log(prevState.contacts);
    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  addContact = (data) => {
    this.setState({
      contacts: [data, ...this.state.contacts],
    });
  };

  changeFilter = (ev) => {
    this.setState({
      filter: ev.currentTarget.value,
    });
  };

  visibleItems = () => {
    const { contacts } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = (contactID) => {
    // console.log(contactID)
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactID
      ),
    }));
  };
  render() {
    const { filter } = this.state;
    const { changeFilter, addContact } = this;
    return (
      <>
        <Form addContactItem={addContact} contacts={this.state.contacts} />
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          itemsRender={this.visibleItems()}
          deleteItem={this.deleteContact}
        />
      </>
    );
  }
}
