import moment from "moment";
import backIcon from "../assets/back.svg";
import { useEffect, useState } from "react";
import Chart from "./Chart";

const Next5days = (props) => {
  const { data, clickBack } = props;
  const [card, setCard] = useState([]);
  const [chart, setChart] = useState(false);

  const forecast = data?.list;
  const city = data?.city;

  let allData = data.list?.map(({ dt_txt, main, weather }) => {
    const day = moment(dt_txt).format("dddd");
    const time = moment(dt_txt).format("MMMM Do [-] hh:mm");
    return {
      day,
      time,
      main,
      weather,
    };
  });

  let finalData = [
    ...new Map(allData?.map((item) => [item.day, item])).values(),
  ];

  useEffect(() => {
    setCard(finalData);
  }, [forecast]);

  const onClick = (props) => {
    if (card.length === 1) {
      setCard(finalData);
      setChart(false);
      return;
    }
    setCard([props]);
    setChart(true);
  };

  finalData[0].day = `${finalData[0].day} - Today`;
  finalData[1].day = `${finalData[1].day} - Tomorrow`;

  return (
    <section id="nextdays" className="container">
      <header className="nav">
        <div className="nav" onClick={() => clickBack()}>
          <img
            className="back_icon"
            src={backIcon}
            alt="back to the homepage"
          />
          <p>back</p>
        </div>
        <h5>
          Next 5 days - {city?.name}, {city?.country}
        </h5>
      </header>
      {card?.map((props, i) => {
        const { day, time, main, weather } = props;

        return (
          <>
            <div
              key={Math.random()}
              className="card_container bg-white"
              onClick={() => onClick(props)}
            >
              <div>
                <h2>{day}</h2>
                <p className="text-secondary">{time}</p>
              </div>
              <div className="card_img">
                <h2 className="text-bold">{main.temp}°</h2>
                <img
                  src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
            </div>
            {chart && (
              <Chart
                day={day}
                data={allData}
                // onMouseMove={(e) => console.log(card)}
              />
            )}
          </>
        );
      })}
    </section>
  );
};

export default Next5days;
