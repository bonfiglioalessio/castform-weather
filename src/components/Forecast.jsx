import arrow from "../assets/arrow.svg";
import { formatTime } from "../helpers/dateUtils";

const Forecast = (props) => {
  const { data, next5Days } = props;
  const slicedData = data?.slice(0, 12);

  return (
    <section>
      <div className="details_container">
        <div className="forecast_container">
          <p>Hourly Forecast</p>
        </div>
        <div className="forecast_container">
          <span onClick={next5Days}>Next 5 Days</span>
          <div className="arrow">
            <img src={arrow} width={7} alt="" />
          </div>
        </div>
      </div>

      <div className="forecast_container">
        {slicedData?.map((item, index) => {
          const { dt_txt, dt, main, weather } = item;
          const time = formatTime(dt_txt, dt);

          return (
            <button className="box" key={index}>
              <p>{time}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
                width={40}
                height={40}
                alt={weather[0].description || ""}
              />
              <p>{Math.round(main.temp)}°</p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Forecast;
