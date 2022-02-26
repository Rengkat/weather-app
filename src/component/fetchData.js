import React, { useState, useEffect } from "react";
const api = {
  key: "a379c315434996dd079b0ede8dd9943a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function FetchDataComponent() {
  const [data, setData] = useState({});
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
        .catch((error) => {});
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
  // const {
  //   name,
  //   main: { temp, humidity, pressure },
  //   weather: [{ main }],
  // } = data;
  return (
    <div className="container">
      <div className="input">
        <input
          type="text"
          placeholder="Enter country..."
          value={country}
          onChange={handleChange}
          onKeyPress={fetchData}
        />
      </div>
      <div className="details">
        <div className="country">
          <h3>
            {data.name}, {data.sys.country}
          </h3>
        </div>
        <div className="date">{getDate(new Date())}</div>
        <div className="temp-press-hum">
          <h2 className="temperature">
            Temperature:
            {Math.ceil(data.main.temp)}
            <sup>0</sup>C
          </h2>
          <h2 className="humidity">
            Humidity:
            {Math.ceil(data.main.humidity)}
            g.kg<sup>-1</sup>
          </h2>
          <h2 className="pressure">
            Atmospheric Pressure: {data.main.pressure}atm
          </h2>
        </div>
        <div className="weather">
          <h3>{data.weather[0].main}</h3>
        </div>
      </div>
    </div>
  );
}

export default FetchDataComponent;
