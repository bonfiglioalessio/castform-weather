import { useState, useMemo } from "react";
import CastformMascot from "../castform/CastformMascot";
import { getCastformForm } from "../../utils/castformUtils";

const Hero = ({
  city,
  country,
  temperature,
  description,
  high,
  low,
  img,
  feels_like = null,
  onOpenPokedex,
}) => {
  const [showDialogue, setShowDialogue] = useState(true);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const castformForm = useMemo(
    () => getCastformForm(description, img, temperature),
    [description, img, temperature]
  );

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
        <div className="hero_primary_metrics">
          <div className="hero_temp_stage">
            <span className="hero_temp_number">{temperature}</span>
            <span className="hero_temp_deg">°</span>
          </div>

          <div className="hero_condition_line">
            {img && (
              <img
                src={`https://openweathermap.org/img/wn/${img}.png`}
                alt={description || ""}
                className="hero_mini_icon"
                width={26}
                height={26}
              />
            )}
            <span className="hero_condition_name">{description || "Clear"}</span>
          </div>

          {feels_like !== null && (
            <span className="hero_feels_text">Feels like {feels_like}°</span>
          )}
        </div>

        <div className="hero_mascot_slot">
          <CastformMascot
            condition={description}
            icon={img}
            temp={temperature}
          />
        </div>
      </div>

      {showDialogue && (
        <div className="hero_castform_dialogue">
          <div className="dialogue_bubble_header">
            <div className="dialogue_identity">
              <span className="bubble_pokedex_id">#351 · Castform</span>
              <span className="bubble_ability">Ability: Forecast</span>
            </div>
            <button
              type="button"
              className="dialogue_close_btn"
              onClick={() => setShowDialogue(false)}
              aria-label="Close dialogue"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <p className="bubble_quote">"{castformForm.quote}"</p>
          <span className="bubble_tip">💡 {castformForm.tip}</span>
        </div>
      )}

      {high !== null && low !== null && (
        <div className="hero_card_footer">
          <div className="hero_range_pill">
            <span className="temp_arrow_low">↓</span> {low}°
            <span className="range_sep">·</span>
            <span className="temp_arrow_high">↑</span> {high}°
          </div>
          {onOpenPokedex ? (
            <button
              type="button"
              className="hero_pokedex_trigger_badge"
              onClick={onOpenPokedex}
              title="Open Castform Pokédex (#351)"
            >
              <span className="pokedex_badge_icon">📖</span> Pokédex #351
            </button>
          ) : (
            <span className="hero_forecast_badge">Weather Pokémon #351</span>
          )}
        </div>
      )}
    </section>
  );
};

export default Hero;
