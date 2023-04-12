import { useRef } from "react";
import clsx from "clsx";
import searchIcon from "/images/search.svg";
import menuIcon from "/images/menu.svg";

const Navbar = (props) => {
  const { onChange, onClick, value, filteredArr } = props;
  const inputRef = useRef();

  return (
    <header>
      <nav>
        <div className="input">
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
        <div className="box_icon">
          <img src={menuIcon} alt="" />
        </div>
      </nav>

      <ul className={clsx("list", value !== "" ? "glassed" : "")}>
        {filteredArr?.map(({ label, name }) => {
          return (
            <li
              key={Math.random()}
              onClick={() => onClick({ name })}
            >
              {label}
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Navbar;
