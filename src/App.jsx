import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherContainer from "./components/WeatherContainer";

function App() {
  const [weather, setWeather] = useState(null);
  const [isDay, setIsDay] = useState(undefined);

  const success = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const API_KEY = "04d82729529b21d95349b17089c4b561";

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then(({ data }) => {
        setWeather(data);
        const currentTime = new Date().getTime() / 1000;
        setIsDay(currentTime >= data.sys.sunrise && currentTime < data.sys.sunset);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <main
      className={`font-Lato flex justify-center items-center min-h-screen text-white px-2 ${
        isDay !== undefined ? (isDay ? "bg-day" : "bg-night") : ""
      }`}
      style={{
        backgroundImage: isDay !== undefined ? (isDay ? "url('/bgDayDstp.jpeg')" : "url('/bgNigth.jpeg')") : 'none',
      }}
    >
      {weather === null ? (
        <div>
          <img src="/Vector.png" alt="Loading..." />
          <div>Loading...</div>
        </div>
      ) : (
        <WeatherContainer weather={weather} />
      )}
    </main>
  );
}

export default App;
