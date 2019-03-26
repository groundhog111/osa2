import React from 'react';
import Part from './Part'

const Content = (props) => {
   
   const osat = () => {
      return  props.parts.map((part) => <Part key = {part.id} part = {part.name} exercises = {part.exercises} />)
   }

   let yhteensa = 0
   props.parts.forEach(element => {yhteensa = yhteensa + element.exercises});

   return (
      <div>
         {osat()}
         <p>Yhteensä {yhteensa} tehtävää </p>
      </div>
   )
}

export default Content