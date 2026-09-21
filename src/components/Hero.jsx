const Hero = ({
  city,
  country,
  temperature,
  description,
  high,
  low,
  img,
  feels_like = null,
}) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <section className="glass_card hero_glass_card">
      <div className="hero_card_header">
        <div className="hero_location_badge">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hero_pin_icon"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <h1 className="hero_city_title">
            {city}{country ? `, ${country}` : ""}
          </h1>
        </div>
        <span className="hero_date_badge">{currentDate}</span>
      </div>

      <div className="hero_card_body">
        <div className="hero_temp_stage">
          <span className="hero_temp_number">{temperature}</span>
          <span className="hero_temp_deg">°</span>
        </div>

        <div className="hero_condition_block">
          <div className="hero_condition_line">
            {img && (
              <img
                src={`https://openweathermap.org/img/wn/${img}.png`}
                alt={description || ""}
                className="hero_mini_icon"
                width={30}
                height={30}
              />
            )}
            <span className="hero_condition_name">{description || "Clear"}</span>
          </div>

          {feels_like !== null && (
            <span className="hero_feels_text">Feels like {feels_like}°</span>
          )}
        </div>
      </div>

      {high !== null && low !== null && (
        <div className="hero_card_footer">
          <div className="hero_range_pill">
            <span className="temp_arrow_low">↓</span> {low}°
            <span className="range_sep">·</span>
            <span className="temp_arrow_high">↑</span> {high}°
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
