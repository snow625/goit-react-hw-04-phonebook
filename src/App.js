import { useState, useEffect, useRef, useCallback } from "react";

import Contacts from "./components/Contacts";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";

import { nanoid } from "nanoid";
import "./index.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  // *******для первого рендера
  const firstRender = useRef(true);
  // **********************

  useEffect(() => {
    const data = localStorage.getItem("contacts-list");
    if (data && JSON.parse(data).length) {
      setContacts([...JSON.parse(data)]);
    }
  }, []);

  useEffect(() => {
    function compare() {
      const currentState = JSON.stringify(contacts);
      const localStorageState = localStorage.getItem("contacts-list");
      if (currentState === localStorageState) {
        return true;
      }
      return false;
    }

    if (!firstRender.current) {
      if (!compare()) {
        localStorage.setItem("contacts-list", JSON.stringify(contacts));
      }
    } else {
      firstRender.current = false;
    }
  }, [contacts]);

  const addPhoneName = useCallback(
    (obj) => {
      const isInclude = contacts.find(
        ({ name }) => name.toLowerCase() === obj.name.toLowerCase()
      );
      if (!isInclude) {
        const newObj = { id: nanoid(), ...obj };
        setContacts((prevState) => {
          return [...prevState, newObj];
        });
        return;
      }
      alert(`${isInclude.name} is already in contacts`);
      return;
    },
    [setContacts]
  );

  const changeFilterState = useCallback(
    ({ target: { value } }) => {
      setFilter(value);
    },
    [setFilter]
  );

  const filterItemsByName = () => {
    if (!filter) {
      return contacts;
    }
    const newItems = contacts.filter((e) => {
      const { name } = e;
      return name.toLowerCase().includes(filter.toLowerCase());
    });
    return newItems;
  };

  const deleteContact = useCallback(
    (id) => {
      setContacts((prevState) => [...prevState.filter((el) => el.id !== id)]);
    },
    [setContacts]
  );

  return (
    <div className="container">
      <h1 className="title">Phonebook</h1>
      <ContactForm onSubmit={addPhoneName} />

      <h2 className="title">Contacts</h2>
      <Filter onChange={changeFilterState} />
      <Contacts items={filterItemsByName()} onClick={deleteContact} />
    </div>
  );
};

export default App;
