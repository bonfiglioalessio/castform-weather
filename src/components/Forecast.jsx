import arrow from "../assets/arrow.svg";
import moment from "moment";

const Forecast = (props) => {
  const { data, next5Days } = props;
  let slicedData = data?.slice(0, 12);
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
        {slicedData?.map((props, index) => {
          const { dt_txt, main, weather } = props;

          const time = moment(dt_txt).format("HH:mm");
          return (
            <button className="box" key={index}>
              <p>{time}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
                width={40}
                height={40}
                alt=""
              />
              <p>{main.temp}°</p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Forecast;
