import React from 'react'

const PersonForm = ({handleChangeName,handleChangeNumber,handleSubmitAdd,newName,newNumber}) => {
   return (
      <form onSubmit={handleSubmitAdd}>
        <div>
          nimi: <input onChange={handleChangeName} value={newName} />
        </div>
        <div>
          numero: <input onChange={handleChangeNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
   )
}

export default PersonForm