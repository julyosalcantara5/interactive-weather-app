import React, {useState, useEffect, use} from 'react'
import './index.css'
import axios from 'axios'


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState(new Date());

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=6b872f69e4802a4828cf49bf1d7b3c1a`

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
      });
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="app-title">
        {/*<i className="fa-solid fa-cloud-sun"></i>*/}
        <h1>Interactive Weather App</h1>
      </div>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter your Location'
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="date-row">
            {!data.name && (
              <div className="helper-text">
                Search for Location to Check the Weather Information.
              </div>
            )}
          </div>
          <div className="date-time">
            <p>
              {dateTime.toLocaleString('en-PH', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </p>
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()} °C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="Humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="Wind">
              {data.main ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;