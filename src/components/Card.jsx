import visibility_img from "../assets/eye.png";
import wind_img from "../assets/wind.png";
import humidity_img from "../assets/humidity.png";

const Card = (props) => {
  const { wind_speed = 33, humidity = 76, visibility = 8.9 } = props;

  const card = [
    {
      img: visibility_img,
      title: "Visibility",
      detail: `${visibility}km`,
    },
    {
      img: wind_img,
      title: "Wind",
      detail: `${wind_speed}km/h`,
    },
    {
      img: humidity_img,
      title: "Humidity",
      detail: `${humidity}%`,
    },
  ];

  return (
    <section>
      {card.map(({ img, title, detail }) => (
        <div key={Math.random()} className="card_container">
          <div className="card_img">
            <div className="card_box glassed">
              <img src={img} alt="" />
            </div>
            <p>{title}</p>
          </div>
          <div className="card_detail">
            <p>{detail}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Card;
