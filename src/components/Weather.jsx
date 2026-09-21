const Weather = ({ summary = "Optimal atmospheric visibility" }) => {
  return (
    <div className="weather_live_bar">
      <div className="live_radar_pill">
        <span className="live_pulse_dot" />
        <span className="live_radar_label">Real-Time Atmosphere</span>
      </div>
      <span className="live_summary_text">{summary}</span>
    </div>
  );
};

export default Weather;
