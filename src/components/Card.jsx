import { degToCompass, getSunStatus, formatUnixTime } from "../helpers/dateUtils";

const Card = (props) => {
  const {
    wind_speed = 0,
    wind_deg = 0,
    humidity = 0,
    visibility = 0,
    feels_like = null,
    pressure = 1013,
    sunrise = null,
    sunset = null,
    temp = null,
  } = props;

  const compassDir = degToCompass(wind_deg);
  const sunData = getSunStatus(sunrise, sunset);

  // Approximate dew point using Magnus formula
  const dewPoint = temp !== null && humidity > 0
    ? Math.round(temp - ((100 - humidity) / 5))
    : null;

  // Circular progress stroke for humidity (radius 26 -> circumference ~163)
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const humidityOffset = circumference - (Math.min(100, Math.max(0, humidity)) / 100) * circumference;

  return (
    <section className="bento_metrics_section">
      <div className="bento_grid_2x2">
        {/* 1. WIND WIDGET WITH COMPASS DIAL */}
        <div className="glass_card bento_tile wind_tile">
          <div className="bento_header">
            <div className="bento_icon_tag">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
                <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
              </svg>
            </div>
            <span className="bento_label">WIND</span>
          </div>

          <div className="bento_center_row">
            <div className="bento_big_val_wrap">
              <span className="bento_big_val">{wind_speed}</span>
              <span className="bento_unit">km/h</span>
            </div>

            {/* Micro Compass Dial */}
            <div className="bento_compass_dial" title={`Wind direction: ${wind_deg}° (${compassDir})`}>
              <span className="compass_mark north">N</span>
              <span className="compass_mark east">E</span>
              <span className="compass_mark south">S</span>
              <span className="compass_mark west">W</span>
              <div
                className="compass_pointer_arrow"
                style={{ transform: `rotate(${wind_deg}deg)` }}
              >
                <div className="arrow_tip" />
              </div>
            </div>
          </div>

          <div className="bento_footer_text">
            <span>{compassDir} · {wind_speed < 15 ? "Gentle Breeze" : wind_speed < 30 ? "Moderate Wind" : "Strong Gusts"}</span>
          </div>
        </div>

        {/* 2. HUMIDITY WIDGET WITH CIRCULAR RING GAUGE */}
        <div className="glass_card bento_tile humidity_tile">
          <div className="bento_header">
            <div className="bento_icon_tag">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
            <span className="bento_label">HUMIDITY</span>
          </div>

          <div className="bento_center_row">
            <div className="bento_big_val_wrap">
              <span className="bento_big_val">{humidity}</span>
              <span className="bento_unit">%</span>
            </div>

            {/* Circular Progress Gauge */}
            <div className="bento_radial_gauge">
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  className="gauge_bg_track"
                  strokeWidth="5"
                  fill="none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  className="gauge_fill_bar"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={humidityOffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="gauge_inner_text">{humidity}%</div>
            </div>
          </div>

          <div className="bento_footer_text">
            <span>{dewPoint !== null ? `Dew point is ${dewPoint}° right now` : "Comfortable moisture level"}</span>
          </div>
        </div>

        {/* 3. SUNSET & SUNRISE ARC */}
        <div className="glass_card bento_tile sun_tile">
          <div className="bento_header">
            <div className="bento_icon_tag">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
              </svg>
            </div>
            <span className="bento_label">SUN & TWILIGHT</span>
          </div>

          <div className="sun_center_stage">
            <div className="sun_arc_wrapper">
              <svg width="100%" height="40" viewBox="0 0 160 50">
                <path
                  d="M 10,45 A 70,70 0 0,1 150,45"
                  fill="none"
                  className="sun_arc_track"
                  strokeWidth="3"
                />
                {sunData.isDay && (
                  <circle
                    cx={10 + (140 * (sunData.percent / 100))}
                    cy={45 - (35 * Math.sin(Math.PI * (sunData.percent / 100)))}
                    r="5"
                    className="sun_dot_glow"
                  />
                )}
              </svg>
            </div>

            <div className="sun_time_row">
              <span className="sun_pill">Rise: {formatUnixTime(sunrise)}</span>
              <span className="sun_pill">Set: {formatUnixTime(sunset)}</span>
            </div>
          </div>

          <div className="bento_footer_text">
            <span>{sunData.label} {sunData.detail}</span>
          </div>
        </div>

        {/* 4. VISIBILITY & PRESSURE */}
        <div className="glass_card bento_tile visibility_tile">
          <div className="bento_header">
            <div className="bento_icon_tag">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="bento_label">VISIBILITY</span>
          </div>

          <div className="bento_big_val_wrap">
            <span className="bento_big_val">{visibility}</span>
            <span className="bento_unit">km</span>
          </div>

          <div className="clarity_meter_bar">
            <div
              className="clarity_fill"
              style={{ width: `${Math.min(100, (visibility / 10) * 100)}%` }}
            />
          </div>

          <div className="bento_footer_text">
            <span>{visibility >= 10 ? "Clear horizon" : "Moderate haze"} · {pressure} hPa</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
