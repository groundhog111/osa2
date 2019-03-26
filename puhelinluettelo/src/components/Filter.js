import React from 'react';

const Filter = ({handleSubmitRajaa, handleChangeRajaa, newRajaus}) => {
   return (
      <form onSubmit = {handleSubmitRajaa}>
        <div>
          rajaa näyttettävistä: <input onChange = {handleChangeRajaa} value = {newRajaus} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
   )
}

export default Filter