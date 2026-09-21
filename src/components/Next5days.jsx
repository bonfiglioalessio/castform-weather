import moment from "moment";
import { useMemo, useState } from "react";
import backIcon from "../assets/back.svg";
import Chart from "./Chart";

const Next5days = ({ data, clickBack }) => {
  const [selectedDateKey, setSelectedDateKey] = useState(null);

  const city = data?.city;
  const rawList = data?.list || [];

  const daysList = useMemo(() => {
    // Group all 3-hour forecasts by calendar date (YYYY-MM-DD)
    const grouped = rawList.reduce((acc, item) => {
      const dateKey = moment(item.dt_txt).format("YYYY-MM-DD");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    }, {});

    return Object.keys(grouped).map((dateKey) => {
      const items = grouped[dateKey];
      const mDate = moment(dateKey);
      const isToday = mDate.isSame(moment(), "day");
      const isTomorrow = mDate.isSame(moment().add(1, "day"), "day");

      let dayLabel = mDate.format("dddd");
      if (isToday) {
        dayLabel = `${dayLabel} - Today`;
      } else if (isTomorrow) {
        dayLabel = `${dayLabel} - Tomorrow`;
      }

      const temps = items.map((i) => i.main.temp);
      const minTemp = Math.round(Math.min(...temps));
      const maxTemp = Math.round(Math.max(...temps));

      // Choose representative forecast around midday 12:00
      const middayItem =
        items.find((i) => i.dt_txt.includes("12:00:00")) ||
        items.find((i) => i.dt_txt.includes("15:00:00")) ||
        items[Math.floor(items.length / 2)] ||
        items[0];

      // Format clean chronological chart points
      const chartData = items.map((item) => ({
        time: moment(item.dt_txt).format("HH:mm"),
        temp: Math.round(item.main.temp * 10) / 10,
        feels_like: Math.round(item.main.feels_like * 10) / 10,
        description: item.weather?.[0]?.description,
        icon: item.weather?.[0]?.icon,
        timestamp: item.dt,
      }));

      return {
        dateKey,
        dayLabel,
        formattedDate: mDate.format("MMMM Do"),
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
    <section id="nextdays" className="container">
      <header className="nav">
        <div className="nav_back" onClick={clickBack}>
          <img
            className="back_icon"
            src={backIcon}
            alt="back to the homepage"
          />
          <span>Back</span>
        </div>
        <h5>
          Next 5 days · {city?.name}, {city?.country}
        </h5>
      </header>

      <div className="days_cards_list">
        {daysList.map((day) => {
          const isOpen = selectedDateKey === day.dateKey;

          return (
            <div key={day.dateKey} className="day_item_wrapper">
              <div
                className={`card_container bg-white ${isOpen ? "active" : ""}`}
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
                  <h2>{day.dayLabel}</h2>
                  <p className="text-secondary">{day.formattedDate}</p>
                </div>

                <div className="card_img day_weather_info">
                  <div className="temp_summary">
                    <span className="card_main_temp">{day.currentTemp}°</span>
                    <span className="temp_sub">
                      L: {day.minTemp}° · H: {day.maxTemp}°
                    </span>
                  </div>

                  {day.weather?.icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather.icon}@4x.png`}
                      width={44}
                      height={44}
                      alt={day.weather.description || "weather condition"}
                      className="weather_symbol"
                    />
                  )}

                  <svg
                    className={`expand_chevron ${isOpen ? "open" : ""}`}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
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
    </section>
  );
};

export default Next5days;
