import arrow from "../assets/arrow.svg";

const Forecast = (props) => {
  const weather = [
    {
    //   img: cloud,
      hour: "13:00",
      temp: "21",
    },
    {
    //   img: sun,
      hour: "NOW",
      temp: "19",
    },
    {
    //   img: clouds,
      hour: "13:00",
      temp: "18",
    },
    {
    //   img: cloud,
      hour: "13:00",
      temp: "20",
    },
    {
    //   img: sun,
      hour: "13:00",
      temp: "16",
    },
    {
    //   img: cloud,
      hour: "13:00",
      temp: "15",
    },
    {
    //   img: sun,
      hour: "13:00",
      temp: "16",
    },
    {
    //   img: cloud,
      hour: "13:00",
      temp: "18",
    },
    {
    //   img: sun,
      hour: "13:00",
      temp: "21",
    },
    {
    //   img: clouds,
      hour: "13:00",
      temp: "22",
    },
  ];
  return (
    <section>
      <div className="details_container">
        <div className="forecast_container">
          <p>Today</p>
          <span>Tomorrow</span>
        </div>
        <div className="forecast_container">
          <span>Next 7 Days</span>
          <div className="arrow">
            <img src={arrow} width={7} alt="" />
          </div>
        </div>
      </div>

      <div className="forecast_container">
        {weather.map(({ img, hour, temp }, index) => (
          <button className="glassed box" key={index++}>
            <p>{hour}</p>
            {/* <img src={img} width={40} height={40} alt="" /> */}
            <p>
              <b>{temp}°</b>
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Forecast;
