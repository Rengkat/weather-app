import React, { useState } from "react";
const api = {
  key: "a379c315434996dd079b0ede8dd9943a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function FetchDataComponent() {
  const [data, setData] = useState(null);
  const [country, setCountry] = useState("");
  const fetchData = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${country}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setCountry("");
          console.log(data);
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    }
  };

  function getDate(d) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date}, ${month} ${year}`;
  }
  const handleChange = (e) => {
    setCountry(e.target.value);
    console.log(e.target.value);
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="input">
        <input
          type="text"
          placeholder="Enter country or City..."
          value={country}
          onChange={handleChange}
          onKeyPress={fetchData}
        />
      </div>
      {data ? (
        <div className="details">
          <div className="country">
            <h3>
              {data.name}, {data.sys.country}
            </h3>
            <h5 style={{ fontStyle: "italic" }}>{getDate(new Date())}</h5>
          </div>
          <div className="temp-press-hum">
            <h2 className="temperature">
              Temperature:
              <br />
              <span>
                {Math.ceil(data.main.temp)}
                <sup>0</sup>C
              </span>
            </h2>
            <h2 className="humidity">
              Humidity:
              <br />
              <span>
                {" "}
                {Math.ceil(data.main.humidity)}
                g.kg<sup>-1</sup>
              </span>
            </h2>
            <h2 className="pressure">
              Atm. Pressure:
              <br /> <span>{data.main.pressure}atm</span>
            </h2>
          </div>
          <div className="weather">
            <h3>{data.weather[0].main}</h3>
          </div>
        </div>
      ) : (
        <h1 style={{ margin: "1rem auto", width: "80%" }}>
          Search a country or city...
        </h1>
      )}
    </div>
  );
}

export default FetchDataComponent;
