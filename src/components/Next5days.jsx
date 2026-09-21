import { useMemo, useState } from "react";
import backIcon from "../assets/back.svg";
import Chart from "./Chart";
import {
  formatTime,
  getDateKey,
  formatDayLabel,
  formatMonthDay,
} from "../helpers/dateUtils";

const Next5days = ({ data, clickBack }) => {
  const [selectedDateKey, setSelectedDateKey] = useState(null);

  const city = data?.city;
  const rawList = data?.list || [];

  const daysList = useMemo(() => {
    // Group all 3-hour forecasts by calendar date (YYYY-MM-DD)
    const grouped = rawList.reduce((acc, item) => {
      const dateKey = getDateKey(item.dt_txt, item.dt);
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    }, {});

    return Object.keys(grouped).map((dateKey) => {
      const items = grouped[dateKey];
      const dayLabel = formatDayLabel(dateKey);
      const formattedDate = formatMonthDay(dateKey);

      const temps = items.map((i) => i.main.temp);
      const minTemp = Math.round(Math.min(...temps));
      const maxTemp = Math.round(Math.max(...temps));

      // Choose representative forecast around midday 12:00
      const middayItem =
        items.find((i) => i.dt_txt?.includes("12:00:00")) ||
        items.find((i) => i.dt_txt?.includes("15:00:00")) ||
        items[Math.floor(items.length / 2)] ||
        items[0];

      // Format clean chronological chart points
      const chartData = items.map((item) => ({
        time: formatTime(item.dt_txt, item.dt),
        temp: Math.round(item.main.temp * 10) / 10,
        feels_like: Math.round(item.main.feels_like * 10) / 10,
        description: item.weather?.[0]?.description,
        icon: item.weather?.[0]?.icon,
        timestamp: item.dt,
      }));

      return {
        dateKey,
        dayLabel,
        formattedDate,
        minTemp,
        maxTemp,
        currentTemp: Math.round(middayItem.main.temp),
        weather: middayItem.weather?.[0],
        chartData,
      };
    });
  }, [rawList]);

  const handleToggleDay = (dateKey) => {
    setSelectedDateKey((prev) => (prev === dateKey ? null : dateKey));
  };

  return (
    <section id="nextdays" className="vision_sheet_modal">
      <div className="sheet_container">
        <header className="sheet_nav_bar">
          <button
            type="button"
            className="glass_pill nav_back_btn"
            onClick={clickBack}
          >
            <img
              className="back_icon"
              src={backIcon}
              alt="back"
            />
            <span>Back</span>
          </button>
          <h2 className="sheet_title">
            Next 5 Days · {city?.name}{city?.country ? `, ${city?.country}` : ""}
          </h2>
        </header>

        <div className="days_cards_list">
          {daysList.map((day) => {
            const isOpen = selectedDateKey === day.dateKey;

            return (
              <div key={day.dateKey} className="day_item_wrapper">
                <div
                  className={`glass_card day_item_card ${isOpen ? "active_card" : ""}`}
                  onClick={() => handleToggleDay(day.dateKey)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleToggleDay(day.dateKey);
                    }
                  }}
                >
                  <div className="day_meta">
                    <h3 className="day_title">{day.dayLabel}</h3>
                    <p className="day_subdate">{day.formattedDate}</p>
                  </div>

                  <div className="day_weather_info">
                    <div className="glass_pill day_temp_pill">
                      <span className="pill_main_temp">{day.currentTemp}°</span>
                      <span className="pill_range_temp">
                        {day.minTemp}° / {day.maxTemp}°
                      </span>
                    </div>

                    {day.weather?.icon && (
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                        width={36}
                        height={36}
                        alt={day.weather.description || "weather"}
                        className="weather_symbol"
                      />
                    )}

                    <svg
                      className={`expand_chevron ${isOpen ? "open" : ""}`}
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {isOpen && (
                  <Chart
                    data={day.chartData}
                    minTemp={day.minTemp}
                    maxTemp={day.maxTemp}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Next5days;
