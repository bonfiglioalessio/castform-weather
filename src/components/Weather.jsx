const Weather = (props) => {
  const { img, temperature, weather_descriptions, description } = props;
  return (
    <section className="weather_container">
      <div className="weather_icon">
        <img
          src={`https://openweathermap.org/img/wn/${img}@4x.png`}
          width="100%"
          alt={description}
        />
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
