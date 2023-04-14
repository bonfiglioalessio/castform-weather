const Hero = (props) => {
  const { city, country, date } = props;
  return (
    <section>
      <div className="box_container">
        <h1>
          {city},
          <br /> {country}
        </h1>
        <h2>{date}</h2>
      </div>
    </section>
  );
};

export default Hero;
