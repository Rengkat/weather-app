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
    <div className="flex border-2 border-white max-w-sm md:max-w-md lg:max-w-2xl mx-auto max-h-screen sm:w-sm shrink-0 rounded-lg shadow-md mt-10">
      <div className="w-4/5 mx-auto">
        <div className="input-div ">
          <input
            type="text"
            placeholder="Enter country or City..."
            value={country}
            onChange={handleChange}
            onKeyPress={fetchData}
            className="w-full mt-3 p-2 rounded-md shadow-md"
          />
        </div>
        {data ? (
          <div className="details">
            <div className="center my-10 text  mx-auto text-2xl text-center text-white font-bold">
              <h3 className="text-4xl">
                {data.name}, {data.sys.country}
              </h3>
              <h5 className="italic">{getDate(new Date())}</h5>
            </div>
            <div className="w-1/2 text-center mt-2 mx-auto p-1 border-2 text-2xl  border-white rounded-xl shadow-orange-100 bg-gradient-to-r from-cyan-500 to-blue-500">
              <h2 className="temperature">
                Temperature:
                <br />
                <span className="text-4xl font-bold">
                  {Math.ceil(data.main.temp)}
                  <sup>0</sup>C
                </span>
              </h2>
              <h2 className="humidity">
                Humidity:
                <br />
                <span className="text-4xl font-bold">
                  {" "}
                  {Math.ceil(data.main.humidity)}
                  g.kg<sup>-1</sup>
                </span>
              </h2>
              <h2 className="pressure">
                Atm. Pressure:
                <br />{" "}
                <span className="text-4xl font-bold">
                  {data.main.pressure}atm
                </span>
              </h2>
            </div>
            <div className=" text-center mt-5 mb-10 text-4xl text-white font-bold">
              <h3>{data.weather[0].main}</h3>
            </div>
          </div>
        ) : (
          <h1 style={{ margin: "1rem auto", width: "80%" }}>
            Search a country or city...
          </h1>
        )}
      </div>
    </div>
  );
}

export default FetchDataComponent;
