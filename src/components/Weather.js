const Weather = (props) => {
  const { img="https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png", temperature, weather_descriptions } = props;
  return (
    <section className="weather_container">
      <div className="weather_icon">
        <img src={img} width={140} alt="" />
      </div>

      <div className="text_container">
        <div className="grade_container">
          <h2>{temperature}</h2>
          <span>°C</span>
        </div>
        <div className="condition_container">
          <h4>{weather_descriptions}</h4>
        </div>
      </div>
    </section>
  );
};

export default Weather;
