import { useState } from "react";
import { formatTime } from "../../utils/dateUtils";
import Chart from "./Chart";

const Forecast = ({ data = [] }) => {
  const [activeTab, setActiveTab] = useState("rail"); // "rail" | "chart"
  const slicedData = data.slice(0, 10);

  // Prepare data for the embedded chart
  const chartData = slicedData.map((item) => ({
    time: formatTime(item.dt_txt, item.dt),
    temp: Math.round(item.main.temp * 10) / 10,
    feels_like: Math.round(item.main.feels_like * 10) / 10,
    description: item.weather?.[0]?.description,
    icon: item.weather?.[0]?.icon,
    timestamp: item.dt,
  }));

  const temps = chartData.map((d) => d.temp);
  const minTemp = temps.length > 0 ? Math.min(...temps) : 0;
  const maxTemp = temps.length > 0 ? Math.max(...temps) : 30;

  return (
    <section className="hourly_card_container glass_card">
      <div className="forecast_card_header">
        <div className="forecast_header_left">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="forecast_clock_icon"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="forecast_card_title">HOURLY FORECAST</span>
        </div>

        <div className="vision_segmented_control">
          <button
            type="button"
            className={`segment_btn ${activeTab === "rail" ? "active" : ""}`}
            onClick={() => setActiveTab("rail")}
          >
            Hourly
          </button>
          <button
            type="button"
            className={`segment_btn ${activeTab === "chart" ? "active" : ""}`}
            onClick={() => setActiveTab("chart")}
          >
            Trend Chart
          </button>
        </div>
      </div>

      {activeTab === "rail" ? (
        <div className="hourly_compact_rail">
          {slicedData.map((item, index) => {
            const { dt_txt, dt, main, weather, pop } = item;
            const time = index === 0 ? "Now" : formatTime(dt_txt, dt);
            const popPercent = pop ? Math.round(pop * 100) : 0;

            return (
              <div
                className={`hourly_column_card ${index === 0 ? "current_hour" : ""}`}
                key={dt || index}
              >
                <span className="hour_text">{time}</span>

                <div className="hour_icon_wrap">
                  {weather?.[0]?.icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                      width={32}
                      height={32}
                      alt={weather[0].description || "weather"}
                      className="hour_icon"
                    />
                  )}
                  {popPercent > 15 && (
                    <span className="hour_pop">{popPercent}%</span>
                  )}
                </div>

                <span className="hour_temperature">{Math.round(main.temp)}°</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="embedded_chart_view">
          <Chart data={chartData} minTemp={minTemp} maxTemp={maxTemp} />
        </div>
      )}
    </section>
  );
};

export default Forecast;
