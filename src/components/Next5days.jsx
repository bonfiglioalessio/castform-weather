import moment from "moment";
import backIcon from "../assets/back.svg";
import { useState } from "react";

const Next5days = (props) => {
  const { data, clickBack } = props;

  const forecast = data?.list;
  const city = data?.city;

  const set = [
    ...new Map(
      forecast?.map((item) => [item["dt_txt"].split(" ")[0], item])
    ).values(),
  ];

  return (
    <section id="nextdays">
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
      {set?.map((props, i) => {
        const { dt_txt, main, weather } = props;

        let day = moment(dt_txt).format("dddd");
        const time = moment(dt_txt).format("MMMM Do [-] hh:mm");

        if (i === 0) {
          day = `${day} - Today`;
        } else if (i === 1) {
          day = `${day} - Tomorrow`;
        }

        return (
          <div key={Math.random()} className="card_container">
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
        );
      })}
    </section>
  );
};

export default Next5days;
