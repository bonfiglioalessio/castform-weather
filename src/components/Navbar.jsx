import { useRef } from "react";

const Navbar = (props) => {
  const { onChange, onClick, onLocate, value, filteredArr } = props;
  const inputRef = useRef();

  const handleClear = () => {
    onChange({ target: { value: "" } });
    inputRef.current?.focus();
  };

  return (
    <header className="navbar_header">
      <div className="search_capsule_bar">
        <div className="search_input_box">
          <svg
            className="search_lens_icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => inputRef.current?.focus()}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            type="search"
            name="geo"
            id="geo"
            placeholder="Search city..."
            onChange={onChange}
            value={value}
            ref={inputRef}
            autoComplete="off"
          />

          {value ? (
            <button
              type="button"
              className="search_action_btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ) : (
            onLocate && (
              <button
                type="button"
                className="gps_locate_btn"
                onClick={onLocate}
                title="Use current location"
                aria-label="Use current location"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
              </button>
            )
          )}
        </div>

        {filteredArr && filteredArr.length > 0 && value.trim().length >= 3 && (
          <div className="glass_search_dropdown">
            <ul className="search_results_list">
              {filteredArr.map(({ country, state, name, lat, lon }, index) => (
                <li
                  key={`${name}-${lat}-${lon}-${index}`}
                  onClick={() => onClick({ lat, lon })}
                  className="search_result_item"
                >
                  <div className="result_pin">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="result_text">
                    <span className="city_name">{name}</span>
                    <span className="city_sub">
                      {state ? `${state}, ` : ""}{country}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
