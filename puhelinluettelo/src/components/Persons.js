import React from 'react'
import Person from './Person'

const Persons = ({persons, rajaus}) => {  

   const numbers = () => {

     let personsRender = persons.filter(
       objekti => !rajaus.includes(objekti.name)
     );

     return personsRender.map(person => (
       <Person key={person.name} name={person.name} number={person.number} />
     ));
     
   };

   return numbers()
}

export default Persons 