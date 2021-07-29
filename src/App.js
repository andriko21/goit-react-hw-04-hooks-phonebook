import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Form from "./components/Form/Form";
import ContactList from "./components/ContactLIst/ContactList";
import Filter from "./components/Filter/Filter";

const CONTACTS = [
  { id: uuidv4(), name: "Rosie Simpson", number: "459-12-56" },
  { id: uuidv4(), name: "Hermione Kline", number: "443-89-12" },
  { id: uuidv4(), name: "Eden Clements", number: "645-17-79" },
  { id: uuidv4(), name: "Annie Copeland", number: "227-91-26" },
];

const App = () => {
  const [contacts, setContacts] = useState([...CONTACTS]);
  const [filter, setFilter] = useState("");

  const addContact = (data) => {
    console.log(data);
    setContacts((prevState) => [data, ...prevState]);
  };

  useEffect(() => {
    if (localStorage.getItem("contacts")) {
      setContacts(JSON.parse(localStorage.getItem("contacts")));
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    } catch {
      throw new Error();
    }
  }, [contacts]);

  const changeFilter = (ev) => {
    setFilter(ev.currentTarget.value);
  };

  const visibleItems = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = (contactID) => {
    return setContacts(contacts.filter((contact) => contact.id !== contactID));
  };

  return (
    <>
      <Form addContactItem={addContact} contacts={contacts} />
      <Filter value={filter} onChange={changeFilter} />
      <ContactList itemsRender={visibleItems()} deleteItem={deleteContact} />
    </>
  );
};
export default App;
