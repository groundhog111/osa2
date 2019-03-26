import React from 'react'

const Person = ({name, number, handleDelete, id}) => {

   return <p> {name} {number} <button onClick = {() =>handleDelete(id)}> POISTA</button></p>
}

export default Person