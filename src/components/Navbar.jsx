import { useRef } from "react";
import clsx from "clsx";
import searchIcon from "/images/search.svg";
import menuIcon from "/images/menu.svg";

const Navbar = (props) => {
  const { onChange, onClick, value, filteredArr } = props;
  const inputRef = useRef();

  // const handleClick = () => {
  //   console.log("clicked menu");
  // };

  return (
    <header>
      <nav>
        <div className={clsx("input", value !== "" ? "closed" : "closed")}>
          <input
            type="search"
            name="geo"
            id="geo"
            placeholder="Search city..."
            onChange={onChange}
            value={value}
            ref={inputRef}
          />
          <img
            src={searchIcon}
            alt="search the city"
            onClick={() => inputRef.current.focus()}
          />
        </div>
        <div className={clsx("box_icon", value !== "" ? "hidden" : "hidden")}>
          <img src={menuIcon} alt="" onClick={() => handleClick()} />
        </div>
      </nav>

      <ul className={clsx("list", value !== "" ? "glassed" : "")}>
        {filteredArr?.map(({ country, state, name, lat, lon }) => {
          return (
            <li key={Math.random()} onClick={() => onClick({ lat, lon })}>
              {name}, {state}, {country}
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Navbar;
