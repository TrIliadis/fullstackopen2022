import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from "./services/person";
import "./index.css";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (persons.filter((person) => person.name === newName).length > 0) {
      if (
        window.confirm(
          `${newName} already exists in the Phonebook, replace the old number with a new one?`
        )
      ) {
        const editedPerson = persons.find((person) => person.name === newName);
        editedPerson.number = newNumber;
        personService.editPerson(editedPerson).then((res) => {
          setPersons(
            persons.map((person) => {
              return person.id === res.data.id ? editedPerson : person;
            })
          );
          setNotificationType("success");
          setMessage(`Edited ${editedPerson.name}'s number`);
          setNotificationType(null);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
        return;
      } else return;
    }
    const newPerson = { name: newName, number: newNumber };
    personService
      .addPerson(newPerson)
      .then((res) => setPersons(persons.concat(res)));
    setNotificationType("success");
    setMessage(`Added ${newPerson.name} to the list`);
    setTimeout(() => {
      setNotificationType(null);
      setMessage(null);
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          setNotificationType("error");
          setMessage(`User ${person.name} has been already deleted`);
          setTimeout(() => {
            setMessage(null);
            setNotificationType(null);
          }, 5000);
          setPersons(persons.filter((x) => (x.id === id ? null : x)));
          return;
        });
      setNotificationType("success");
      setMessage(`Deleted ${person.name}'s info`);
      setTimeout(() => {
        setMessage(null);
        setNotificationType(null);
      }, 5000);
    }
  };

  return (
    <div>
      {message ? (
        <Notification type={notificationType} message={message} />
      ) : (
        ""
      )}
      <h1>Phonebook</h1>
      <Filter onChange={handleFilter} />
      <h2>Add new</h2>
      <Form
        onSubmit={handleFormSubmit}
        onNameChange={handleChange}
        nameValue={newName}
        onNumberChange={handleNumber}
        numberValue={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
