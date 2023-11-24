import { useState } from "react";
import WeatherStat from "./WeatherStat";

// eslint-disable-next-line react/prop-types
const WeatherContainer = ({ weather }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const changeUnitTemp = (temp) => {
    if (isCelsius) {
      // tranformacion a celsius
      const celsiusTemp = (temp - 273.15).toFixed(1);
      return `${celsiusTemp} °C`;
    } else {
      // tranformacion a farenheit
      const fahrenheit = ((temp - 273.15) * (9 / 5) + 32).toFixed(1);
      return `${fahrenheit} °F`;
    }
  };



  const handleChangeUnit = () => {
    setIsCelsius(!isCelsius);
  };

  console.log(changeUnitTemp(weather.main.temp));
  console.log(weather);

  return (
    <main className="text-center gap-5 grid">
      <h3 className="text-xl font-semibold">
        {weather.name}, {weather.sys.country}{" "}
      </h3>

      <div className="grid gap-5 sm:grid-cols-[1fr_auto] ">
        {/* SECCION SUPERIOR */}
        <article className="bg-slate-500/50 rounded-2xl grid grid-cols-2 items-center justify-items-center p-3">
          <h4 className="col-span-2 text-lg capitalize">
            {weather.weather[0].description}
          </h4>
          <span className="text-5xl">
            {" "}
            {changeUnitTemp(weather.main.temp)}{" "}
          </span>
          <picture>
            <img src={ `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          </picture>
        </article>
        {/* SECCION INFERIOR */}
        <article className="grid grid-cols-3 justify-items-center bg-slate-500/50 rounded-2xl p-2 py-3 sm:grid-cols-1 items-center">
          <WeatherStat icon="/wind.png" unit="m/s" value={weather.wind.speed} />
          <WeatherStat
            icon="/humidity.png"
            unit="%"
            value={weather.main.humidity}
          />
          <WeatherStat
            icon="/pressure.png"
            unit="hPa"
            value={weather.main.pressure}
          />
        </article>
      </div>

      <button className="bg-slate-400 rounded-lg w-40 mx-auto" onClick={handleChangeUnit}>
        {isCelsius ? "Cambiar a F°" : "Cambiar a C°"}
      </button>
      <div className="flex h-4 gap-x-2 ">
        By: Gerson Llamas
        <img src="/gl-logo.svg" alt="" />
      </div>
    </main>
  );
};
export default WeatherContainer;
