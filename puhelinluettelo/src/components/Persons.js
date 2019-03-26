import React from 'react'
import Person from './Person'

const Persons = ({persons, rajaus, handleDelete}) => {  

   const numbers = () => {

     let personsRender = persons.filter(
       objekti => !rajaus.includes(objekti.name)
     );

     return personsRender.map(person => (
       <Person key={person.name} id={person.id} name={person.name} number={person.number} handleDelete={handleDelete} />
     ));
     
   };

   return numbers()
}

export default Persons 