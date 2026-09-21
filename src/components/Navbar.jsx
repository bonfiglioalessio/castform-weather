import { useRef } from "react";
import searchIcon from "/images/search.svg";

const Navbar = (props) => {
  const { onChange, onClick, value, filteredArr } = props;
  const inputRef = useRef();

  return (
    <header>
      <nav>
        <div className="input open">
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
            onClick={() => inputRef.current?.focus()}
          />
        </div>
      </nav>

      <ul className={`list ${value ? "glassed" : ""}`.trim()}>
        {filteredArr?.map(({ country, state, name, lat, lon }, index) => {
          return (
            <li key={`${name}-${lat}-${lon}-${index}`} onClick={() => onClick({ lat, lon })}>
              {name}, {state}, {country}
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Navbar;
