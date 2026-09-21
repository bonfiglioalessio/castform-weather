import { useEffect, useState, useMemo, useCallback } from "react";
import { CASTFORM_FORMS } from "../helpers/castformUtils";

/**
 * VisionOS Glassmorphic Pokédex Modal for Castform (#351)
 * Desktop Optimized Layout:
 * - Full-width 4-form switcher bar under header (no horizontal overlap)
 * - 2-column balanced desktop grid (Showcase left, Move & Lore right)
 * - Anti-squash stage with chevron arrow buttons and swipe gestures
 */
const PokedexModal = ({ isOpen, onClose, currentForm = CASTFORM_FORMS.NORMAL }) => {
  const formKeys = useMemo(() => Object.keys(CASTFORM_FORMS), []);
  const [selectedFormKey, setSelectedFormKey] = useState("NORMAL");
  const [touchStart, setTouchStart] = useState(null);

  const currentIndex = formKeys.indexOf(selectedFormKey);

  // Keep selectedForm synced with active weather form when modal opens
  useEffect(() => {
    if (isOpen && currentForm?.id) {
      const matchKey = formKeys.find(
        (k) => CASTFORM_FORMS[k].id === currentForm.id
      );
      if (matchKey) {
        setSelectedFormKey(matchKey);
      }
    }
  }, [isOpen, currentForm, formKeys]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + formKeys.length) % formKeys.length;
    setSelectedFormKey(formKeys[prevIndex]);
  }, [currentIndex, formKeys]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % formKeys.length;
    setSelectedFormKey(formKeys[nextIndex]);
  }, [currentIndex, formKeys]);

  // Handle ESC and Arrow Left / Right keys
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch swipe handling
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) handleNext();
    if (diff < -45) handlePrev();
    setTouchStart(null);
  };

  if (!isOpen) return null;

  const form = CASTFORM_FORMS[selectedFormKey] || CASTFORM_FORMS.NORMAL;
  const isNormal = form.id === "normal";
  const weatherBallPower = isNormal ? 50 : 100;
  const isBoosted = !isNormal;

  return (
    <div
      className="pokedex_modal_overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Castform Pokédex Modal"
    >
      <div
        className="pokedex_modal_card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="pokedex_top_bar">
          <div className="pokedex_id_brand">
            <span className="pokedex_dex_badge">#351</span>
            <div>
              <h2 className="pokedex_modal_title">Castform</h2>
              <span className="pokedex_subtitle">The Weather Pokémon · Pokémon Meteo</span>
            </div>
          </div>
          <button
            type="button"
            className="pokedex_close_btn"
            onClick={onClose}
            aria-label="Close Pokédex Modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Full-width 4-Form Selector Bar */}
        <div className="carousel_dots_nav" role="tablist">
          {formKeys.map((key, idx) => {
            const f = CASTFORM_FORMS[key];
            const isActive = idx === currentIndex;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`carousel_dot_tab ${isActive ? "active" : ""}`}
                onClick={() => setSelectedFormKey(key)}
                style={
                  isActive
                    ? {
                        borderColor: `${f.typeColor}99`,
                        boxShadow: `0 2px 12px ${f.typeColor}44`,
                      }
                    : {}
                }
              >
                <span
                  className="carousel_dot_indicator"
                  style={{
                    background: f.typeColor,
                    boxShadow: isActive ? `0 0 8px ${f.typeColor}` : "none",
                  }}
                />
                <span className="carousel_dot_text">{f.name.replace(" Form", "")}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Layout (2-Column on Desktop) */}
        <div className="pokedex_content_columns">
          {/* Column 1: Carousel / Slider Showcase & Specs */}
          <div className="pokedex_col_showcase">
            <div
              className="pokedex_carousel_stage"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                borderColor: `${form.typeColor}55`,
                background: `radial-gradient(circle at center, ${form.auraColor} 0%, rgba(12, 18, 32, 0.78) 75%)`,
              }}
            >
              {/* Prev Carousel Arrow Button */}
              <button
                type="button"
                className="carousel_nav_arrow prev"
                onClick={handlePrev}
                aria-label="Previous form"
                title="Previous Castform form (Arrow Left)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Center Slide View */}
              <div className="carousel_slide_view" key={form.id}>
                <div
                  className="pokedex_artwork_glow"
                  style={{ "--aura": form.auraColor }}
                />
                <img
                  src={form.artwork}
                  alt={`Castform ${form.name}`}
                  className="pokedex_artwork_img carousel_slide_anim"
                />

                <div className="pokedex_form_badge_row">
                  <span
                    className="pokedex_type_pill"
                    style={{
                      background: form.typeBg,
                      color: form.typeColor,
                      borderColor: `${form.typeColor}88`,
                    }}
                  >
                    {form.type.toUpperCase()}
                  </span>
                  <span className="pokedex_form_fullname">{form.name}</span>
                </div>
              </div>

              {/* Next Carousel Arrow Button */}
              <button
                type="button"
                className="carousel_nav_arrow next"
                onClick={handleNext}
                aria-label="Next form"
                title="Next Castform form (Arrow Right)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Quick Specs Cell */}
            <div className="pokedex_specs_strip">
              <div className="spec_item">
                <span className="spec_label">Height</span>
                <strong className="spec_val">0.3 m</strong>
              </div>
              <div className="spec_divider" />
              <div className="spec_item">
                <span className="spec_label">Weight</span>
                <strong className="spec_val">0.8 kg</strong>
              </div>
              <div className="spec_divider" />
              <div className="spec_item">
                <span className="spec_label">Ability</span>
                <strong className="spec_val spec_accent">Forecast</strong>
              </div>
            </div>
          </div>

          {/* Column 2: Signature Move & Official Lore */}
          <div className="pokedex_col_details">
            {/* Signature Move Card */}
            <div
              className="pokedex_move_card"
              style={{
                borderColor: isBoosted ? `${form.typeColor}55` : "rgba(255, 255, 255, 0.14)",
              }}
            >
              <div className="move_card_header">
                <div>
                  <span className="move_tag">Signature Move · Mossa Unica</span>
                  <h4 className="move_title">Weather Ball (Palla Clima)</h4>
                </div>
                <div
                  className="move_power_badge"
                  style={
                    isBoosted
                      ? {
                          borderColor: `${form.typeColor}88`,
                          background: `${form.typeColor}22`,
                        }
                      : {}
                  }
                >
                  <span className="power_number">{weatherBallPower}</span>
                  <span className="power_label">POWER</span>
                </div>
              </div>

              <div className="move_stat_row">
                <div className="move_pill">
                  <span className="pill_dim">Element:</span>
                  <strong style={{ color: form.typeColor }}>{form.type}</strong>
                </div>
                <div className="move_pill">
                  <span className="pill_dim">State:</span>
                  <strong className={isBoosted ? "boosted_state" : ""}>
                    {isBoosted ? "⚡ 2x Power (Boosted)" : "Standard (Normal)"}
                  </strong>
                </div>
              </div>

              <p className="move_desc">
                {isBoosted
                  ? `Under live ${form.name.toLowerCase()} weather, Weather Ball absorbs atmospheric energy, converting into a devastating ${form.type}-type strike with power doubled to 100!`
                  : `In standard or cloudy conditions, Weather Ball acts as a Normal-type move with 50 base power.`}
              </p>
            </div>

            {/* Ability Breakdown */}
            <div className="pokedex_ability_card">
              <div className="ability_header">
                <span className="ability_name">Ability: Forecast (Previsione)</span>
              </div>
              <p className="ability_text">
                Castform's cells are composed of molecular water clusters that instantaneously adapt to temperature, humidity, and precipitation.
              </p>
            </div>

            {/* Official Pokédex Entry Lore */}
            <div className="pokedex_lore_box">
              <p className="lore_quote">
                "Castform was artificially created by scientists at the Hoenn Weather Institute to help forecast climate patterns and protect local communities from severe weather phenomena."
              </p>
              <div className="lore_meta">
                <span>Hoenn Dex #142 · National Dex #351</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokedexModal;
