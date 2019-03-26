import React, { useState, useEffect } from 'react';

import axios from 'axios'
import Tulokset from './components/Tulokset';

const App = () => {
  var raakadata = []
  const [input, setInput] = useState("")

  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        raakadata = response
        setCountries(raakadata.data)
      })
  },[])

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  return (
    <div>
      <form>
        <input onChange={handleChange} value={input} />
      </form>
      <Tulokset countries = {countries} input = {input} setInput = {setInput}/>
    </div>
  )
}

export default App;
