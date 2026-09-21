import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="chart_custom_tooltip">
        <div className="tooltip_header">
          <span className="tooltip_time">{item.time}</span>
          {item.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt={item.description || ""}
              width={24}
              height={24}
            />
          )}
        </div>
        <div className="tooltip_body">
          <span className="tooltip_temp">{Math.round(item.temp)}°C</span>
          {item.description && (
            <span className="tooltip_desc">{item.description}</span>
          )}
        </div>
        {item.feels_like !== undefined && (
          <div className="tooltip_footer">
            <span>Feels like: {Math.round(item.feels_like)}°C</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const Chart = ({ data = [], day, minTemp, maxTemp, onMouseMove }) => {
  let chartData = [];

  // Support both pre-formatted chart data and legacy format
  if (Array.isArray(data) && data.length > 0) {
    if (typeof data[0].temp === "number" && data[0].time) {
      chartData = [...data];
    } else {
      const cleanDay = day ? day.split(" - ")[0] : "";
      chartData = data
        .filter((item) => !cleanDay || item.day?.includes(cleanDay))
        .map((item) => ({
          time: item.time ? item.time.split(" - ").pop() : "",
          temp: item.main?.temp ?? item.temp,
          feels_like: item.main?.feels_like ?? item.feels_like,
          description: item.weather?.[0]?.description ?? item.description,
          icon: item.weather?.[0]?.icon ?? item.icon,
          timestamp: item.dt ?? 0,
        }));
    }
  }

  if (chartData.length === 0) {
    return (
      <div className="chart_empty">
        <p>No hourly forecast data available</p>
      </div>
    );
  }

  const temps = chartData.map((d) => d.temp);
  const calculatedMin =
    minTemp !== undefined ? minTemp : Math.min(...temps);
  const calculatedMax =
    maxTemp !== undefined ? maxTemp : Math.max(...temps);

  return (
    <div className="chart_wrapper">
      <div className="chart_header">
        <div className="chart_title_group">
          <span className="chart_title">Hourly Forecast</span>
          <span className="chart_subtitle">Temperature Trend</span>
        </div>
        <div className="chart_range_badge">
          <span>Low {Math.round(calculatedMin)}°</span>
          <span className="divider">·</span>
          <span>High {Math.round(calculatedMax)}°</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart
          data={chartData}
          margin={{ top: 12, right: 8, left: -22, bottom: 0 }}
          onMouseMove={onMouseMove}
        >
          <defs>
            <linearGradient id="chartTempGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#303345" stopOpacity={0.16} />
              <stop offset="90%" stopColor="#303345" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#eef0f3"
          />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={{ stroke: "#e6e8eb" }}
            tick={{ fill: "#9a938c", fontSize: 11, fontWeight: 500 }}
            dy={5}
          />
          <YAxis
            type="number"
            domain={["dataMin - 1", "dataMax + 1"]}
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9a938c", fontSize: 11, fontWeight: 500 }}
            tickFormatter={(v) => `${Math.round(v)}°`}
            width={32}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#303345"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#chartTempGrad)"
            dot={{ r: 3.5, fill: "#ffffff", strokeWidth: 2, stroke: "#303345" }}
            activeDot={{
              r: 5.5,
              fill: "#303345",
              stroke: "#ffffff",
              strokeWidth: 2.5,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
