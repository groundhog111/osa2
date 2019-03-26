import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/personsService";
import Notification from "./components/Notification"
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0401701440" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [rajaus, setRajaus] = useState("");
  const [newRajaus, setNewRajaus] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personsService.getAll().then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleChangeName = event => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = event => {
    setNewNumber(event.target.value);
  };

  const handleSubmitAdd = event => {
    event.preventDefault();
    const objekti = { name: newName, number: newNumber.toString() };

    if (persons.map(person => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} on jo luettelossa, korvataanko vanha numero uudella?`
        )
      ) {
        let oikeaindeksi = persons
          .map(person => person.name)
          .indexOf(newName);
        personsService
          .update(objekti, oikeaindeksi + 1)
          .then(response => console.log("response", response))
          .then(
            setPersons(
              persons.map(person => {
                if (person.name === objekti.name) return objekti;
                return person;
              })
            ),
            setSuccessMessage(
              `${objekti.name}n puhelinnumero päivitetty`
              ),
            setTimeout(() => {
                setSuccessMessage(null)
              }, 3000)
          );
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    personsService.create(objekti).then(response => {
      setPersons(persons.concat(response.data));
      setSuccessMessage(
        `henkilo '${newName}' lisätty puhelinluetteloon`
        )
      setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      setNewName("");
      setNewNumber("");
    });
  };

  const handleChangeRajaa = event => {
    setNewRajaus(event.target.value);
  };

  const handleDelete = (id) => {
    if(window.confirm(`Poistetaanko ${persons.find((person) => person.id === id).name}`)){
      personsService.deleteUser(id)
      .then((response) => {
        if (response.status === 200) {
          setPersons(persons.filter((person)=> person.id !== id))
        }
          setSuccessMessage(
            `${persons.find((person) => person.id === id).name} poistettu onnistuneesti`
            )
          setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
      })
      .catch(error => {
        setErrorMessage(
          `muistiinpano '${persons.find((person) => person.id === id).name}' on jo valitettavasti poistettu palvelimelta`
          )
        setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
      })
    }
  }

  const handleSubmitRajaa = event => {
    event.preventDefault();
    setRajaus(newRajaus);
    setSuccessMessage(
      `henkilo '${newRajaus}' lisätty listalle`
      )
    setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
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
      
      <Notification message = {successMessage} className = "success" />
      <Notification message = {errorMessage} className = "error"/>

      <h2>Lisää uusi numero</h2>


      <PersonForm
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmitAdd={handleSubmitAdd}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numerot</h2>

      <Persons rajaus={rajaus} persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
