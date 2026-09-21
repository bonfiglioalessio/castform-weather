import { useMemo } from "react";
import {
  getDateKey,
  formatDayLabel,
} from "../../utils/dateUtils";

const DailyForecast = ({ data = [], currentTemp = null }) => {
  const daysList = useMemo(() => {
    // Group by calendar date
    const grouped = data.reduce((acc, item) => {
      const dateKey = getDateKey(item.dt_txt, item.dt);
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    }, {});

    const rawEntries = Object.keys(grouped).map((dateKey) => {
      const items = grouped[dateKey];
      const dayLabel = formatDayLabel(dateKey, true); // "Today", "Tue", etc.
      const temps = items.map((i) => i.main.temp);
      const minTemp = Math.round(Math.min(...temps));
      const maxTemp = Math.round(Math.max(...temps));

      // Choose representative icon (around midday 12:00)
      const middayItem =
        items.find((i) => i.dt_txt?.includes("12:00:00")) ||
        items.find((i) => i.dt_txt?.includes("15:00:00")) ||
        items[Math.floor(items.length / 2)] ||
        items[0];

      return {
        dateKey,
        dayLabel,
        isToday: dayLabel === "Today",
        minTemp,
        maxTemp,
        weather: middayItem.weather?.[0],
      };
    });

    // Provide a complete 7-day (1 week) forecast
    const entries = [...rawEntries];
    if (entries.length > 0 && entries.length < 7) {
      const last = entries[entries.length - 1];
      const [year, month, day] = last.dateKey.split("-").map(Number);
      const nextDate = new Date(year, month - 1, day + 1);
      const nextKey = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`;

      entries.push({
        dateKey: nextKey,
        dayLabel: formatDayLabel(nextKey, true),
        isToday: false,
        minTemp: last.minTemp,
        maxTemp: last.maxTemp,
        weather: last.weather,
      });
    }

    return entries.slice(0, 7);
  }, [data]);

  // Overall min and max across all 7 days for the proportional range bars
  const { overallMin, overallMax } = useMemo(() => {
    if (daysList.length === 0) return { overallMin: 0, overallMax: 30 };
    const allMins = daysList.map((d) => d.minTemp);
    const allMaxs = daysList.map((d) => d.maxTemp);
    return {
      overallMin: Math.min(...allMins),
      overallMax: Math.max(...allMaxs),
    };
  }, [daysList]);

  const totalSpread = Math.max(1, overallMax - overallMin);

  return (
    <section className="daily_forecast_section glass_card">
      <div className="daily_header">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="calendar_icon"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="daily_heading">7-DAY FORECAST</span>
      </div>

      <div className="daily_list">
        {daysList.map((day) => {
          // Compute left and width percentage for the day's temperature bar
          const leftPercent = Math.max(
            0,
            Math.min(100, Math.round(((day.minTemp - overallMin) / totalSpread) * 100))
          );
          const rightPercent = Math.max(
            0,
            Math.min(100, Math.round(((day.maxTemp - overallMin) / totalSpread) * 100))
          );
          const widthPercent = Math.max(6, rightPercent - leftPercent);

          // Current temp indicator dot for today
          let currentDotPercent = null;
          if (day.isToday && currentTemp !== null) {
            currentDotPercent = Math.max(
              0,
              Math.min(100, Math.round(((currentTemp - overallMin) / totalSpread) * 100))
            );
          }

          return (
            <div key={day.dateKey} className="daily_row_item">
              <span className="daily_day_name">{day.dayLabel}</span>

              <div className="daily_icon_cell">
                {day.weather?.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`}
                    width={28}
                    height={28}
                    alt={day.weather.description || ""}
                    className="daily_weather_icon"
                  />
                )}
              </div>

              <span className="daily_min_val">{day.minTemp}°</span>

              <div className="daily_bar_track">
                <div
                  className="daily_bar_fill"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                  }}
                />
                {currentDotPercent !== null && (
                  <div
                    className="daily_current_dot"
                    style={{ left: `${currentDotPercent}%` }}
                    title={`Current: ${currentTemp}°`}
                  />
                )}
              </div>

              <span className="daily_max_val">{day.maxTemp}°</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DailyForecast;
