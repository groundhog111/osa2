import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm"
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "0401701440" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [rajaus, setRajaus] = useState("");
  const [newRajaus, setNewRajaus] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/db')
      .then(response => {
        setPersons(response.data.persons)
      })
  }, [])
  
  const handleChangeName = event => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = event => {
    setNewNumber(event.target.value);
  };

  const handleSubmitAdd = event => {
    event.preventDefault();
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} on jo luettelossa`);
      setNewName("");
      setNewNumber("");
      return;
    }
    const objekti = { name: newName, number: newNumber.toString() };
    setPersons(persons.concat(objekti));
    setNewName("");
    setNewNumber("");
  };

  const handleChangeRajaa = event => {
    setNewRajaus(event.target.value);
  };

  const handleSubmitRajaa = event => {
    event.preventDefault();
    setRajaus(newRajaus);
    setNewRajaus("");
  };

  
  //li elementiint wrappi ^^
  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Filter
        handleChangeRajaa={handleChangeRajaa}
        handleSubmitRajaa={handleSubmitRajaa}
        newRajaus={newRajaus}
      />

      <h2>Lisää uusi numero</h2>

      <PersonForm
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmitAdd={handleSubmitAdd}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numerot</h2>

      <Persons rajaus={rajaus} persons={persons} />
    </div>
  );
};

export default App;
