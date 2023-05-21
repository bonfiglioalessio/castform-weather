import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data, day, onMouseMove }) => {
  day = day.split(" - ")[0];

  data = data.map(({ day, time, main }) => {
    const temp = main.temp;
    day = day.split(" - ")[0];
    time = time.split(" - ")[1];
    return {
      day,
      time,
      temp,
    };
  });

  let newData = data.filter((item) => {
    return item.day === day;
  });

  return (
    <ResponsiveContainer width="100%">
      <AreaChart width={500} data={newData} onMouseMove={(e) => onMouseMove(e)}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="time" reversed />
        <YAxis
          type="number"
          domain={[0, "dataMax + 3"]}
          scale="linear"
          orientation="right"
        />
        <Area type="natural" dataKey="temp" stroke="#313341" fill="#FFF" />
        <Tooltip contentStyle={{ borderRadius: "1rem", padding: "1.5rem" }} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
