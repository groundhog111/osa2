import React from "react";

const Tulokset = ({ countries, input, setInput }) => {
  const countriesInput = () => {
    if (countries.length > 0) {
      return countries.filter(country =>
        country.name.toLowerCase().startsWith(input)
      );
    } else return [];
  };

  const countriesRender = () => {
    if (countriesInput().length > 10)
      return <p>Too many matches, please specify</p>;
    else if (countriesInput().length < 11 && countriesInput().length > 1) {
      return countriesInput().map(country => (
        <li key={country.name}>
          {" "}
          {country.name}{" "}
          <button onClick={() => setInput(country.name.toLowerCase())}>
            show
          </button>{" "}
        </li>
      ));
    } else {
      if (countriesInput().length > 0) {
        const maa = countriesInput()[0];
        const kielet = maa.languages.map(kieli => (
          <p key={kieli.name}>{kieli.name}</p>
        ));
        const lippuimg = {
          height: "80px",
          width: "150px"
        };
        return (
          <div>
            <h1>{maa.name}</h1>
            <p>capital {maa.capital}</p>
            <p>population {maa.population}</p>
            <h2>languages</h2>
            {kielet}
            <img style={lippuimg} src={maa.flag} alt="maan lipun kuva" />
          </div>
        );
      }
    }
  };
  return <div>{countriesRender()}</div>;
};
export default Tulokset;
